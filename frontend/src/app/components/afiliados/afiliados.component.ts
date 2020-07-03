import { Component, OnInit } from '@angular/core';
import { Afiliado } from '../../models/afiliado'
import { AfiliadoService } from 'src/app/services/afiliado.service';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit {
  afiliado: Afiliado;
  afiliadoSeleccionado:Afiliado;
  afiliadoSelAux:Afiliado;
  afiliados: Array<Afiliado>;

  constructor(private _afiliadoService: AfiliadoService) {
    this.afiliado = new Afiliado();
    this.afiliadoSelAux=new Afiliado();
    this.afiliadoSeleccionado = new Afiliado();
    this.cargarAfiliados();
  }

  ngOnInit(): void {
  }

  public cargarAfiliados():void{
    this.afiliados = new Array<Afiliado>();
    this._afiliadoService.getAfiliados().subscribe(
      (result) => {
        var afiliado: Afiliado = new Afiliado();
        result.forEach(element => {
          Object.assign(afiliado, element);
          this.afiliados.push(afiliado);
          afiliado = new Afiliado();
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public registrarAfiliado():void{
    this._afiliadoService.addAfiliado(this.afiliado).subscribe(
      (result) => {
        alert("Afiliado enviado");
      },
      (error) => {
        console.log(error);
      }
    )
    this.afiliado= new Afiliado();
    this.cargarAfiliados();
  }

  public borrarAfiliadoSeleccionado():void{
    this._afiliadoService.deleteAfiliado(this.afiliadoSeleccionado).subscribe(
      (result) => {
        alert("Afiliado eliminado");
      },
      (error) =>{
        console.log(error);
      }
    )
    this.afiliadoSeleccionado=new Afiliado();
    this.cargarAfiliados;
  }

  public modificarAfiliadoSeleccionado():void{
    this._afiliadoService.updateAfiliado(this.afiliadoSelAux).subscribe(
      (result) =>{
        alert("Afiliado modificado");
      },
      (error) =>{
        console.log(error);
      }      
    );
    this.afiliadoSeleccionado= new Afiliado();
    this.cargarAfiliados;
  }

  public seleccionarAfiliado(afiliado:Afiliado):void{
    this.afiliadoSeleccionado=Object.assign(this.afiliadoSeleccionado,afiliado)
  }
}
