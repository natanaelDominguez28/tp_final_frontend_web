import { Component, OnInit } from '@angular/core';
import { Afiliado } from '../../models/afiliado'
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { ToastrService } from 'ngx-toastr'
import { LoginService } from 'src/app/services/login.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit {
  afiliado: Afiliado;
  afiliadoSeleccionado: Afiliado;
  afiliadoSelAux: Afiliado;
  afiliados: Array<Afiliado>;
  imagenConvertida: string
  afiliadosJSON: JSON;

  constructor(private _afiliadoService: AfiliadoService, public _loginService: LoginService, private _toast: ToastrService) {
    this.afiliado = new Afiliado();
    this.afiliadoSelAux = new Afiliado();
    this.afiliadoSeleccionado = new Afiliado();
    this.cargarAfiliados();
  }

  ngOnInit(): void {
  }

  public cargarAfiliados(): void {
    this.afiliados = new Array<Afiliado>();
    this._afiliadoService.getAfiliados().subscribe(
      (result) => {
        var afiliado: Afiliado = new Afiliado();
        this.afiliadosJSON = result;
        result.forEach(element => {
          Object.assign(afiliado, element);
          this.afiliados.push(afiliado);
          afiliado = new Afiliado();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public imprimir(): void {
    printJS({
      printable: this.afiliadosJSON,
      properties: ['dni', 'apellido', 'nombres', "email", "telefono"],
      type: 'json',
      header: '<h3 class="h3">Lista de Afiliados</h3>',
      gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;',
	    gridStyle: 'border: 2px solid #3971A5;'
    })
  }

  public registrarAfiliado(): void {
    this._afiliadoService.addAfiliado(this.afiliado).subscribe(
      (result) => {
        if (result.status==1){
          this._toast.success(result.message, "Exito");
          this.afiliado = new Afiliado();
        }else{
          if(result.status==2){
            this._toast.error(result.message, "Error");
          }else{
            if(result.status==3){
              this._toast.error(result.message, "Error");
            }
          }
        }
        console.log(result);
      },
      (error) => {
        this._toast.error(error, "Se ha producido un error");
      }
    );
    this.cargarAfiliados();
  }

  public borrarAfiliadoSeleccionado(): void {
    this._afiliadoService.deleteAfiliado(this.afiliadoSeleccionado).subscribe(
      (result) => {
        this._toast.info("Afiliado Eliminado", "Exito");
      },
      (error) => {
        console.log(error);
      }
    );
    this.afiliadoSeleccionado = new Afiliado();
    this.cargarAfiliados();
  }

  public modificarAfiliadoSeleccionado(): void {
    this._afiliadoService.updateAfiliado(this.afiliadoSeleccionado).subscribe(
      (result) => {
        this._toast.info("Afiliado Modificado", "Exito");
      },
      (error) => {
        console.log(error);
      }
    );
    this.afiliadoSeleccionado = new Afiliado();
    this.cargarAfiliados();
  }

  public subirImagen(files): void {
    this.afiliado.imagen = files[0].base64;
  }

  public subirImagen2(files): void {
    this.afiliadoSeleccionado.imagen = files[0].base64;
  }
  public seleccionarAfiliado(afiliado: Afiliado): void {
    this.afiliadoSeleccionado = Object.assign({}, afiliado);
  }

  public onUpload(e): void {
    console.log("subiendo ", e.target.files[0]);
  }
}
