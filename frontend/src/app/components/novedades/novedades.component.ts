import { Component, OnInit, ExistingSansProvider } from '@angular/core';
import { Novedad } from '../../models/novedad';
import { NovedadService } from '../../services/novedad.service'
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  novedad: Novedad;
  novedades: Array<Novedad>;
  novedadSeleccionada: Novedad;
  estados:Array<string>;
  desactivarGuardar:boolean;
  msgNovedad="";

  constructor(private _novedadService: NovedadService, public _loginService: LoginService, private _toast: ToastrService) { 
    this.novedad= new Novedad();
    this.novedades= new Array<Novedad>();
    this.novedadSeleccionada= new Novedad();
    this.novedadSeleccionada.usuario=new Usuario();
    this.estados=["pendiente","procesada"];
    this.desactivarGuardar=true;
    this.cargarNovedades();
  }

  public registrarNovedad(): void {
    this.novedad.estado="pendiente";
    this.novedad.usuario=this._loginService.userLogged;
    this._novedadService.addNovedad(this.novedad).subscribe(
      (result) => {
        this._toast.success("Novedad registrada","Exito");
      },
      (error) => {
        this._toast.success(error,"Exito");
      }
    );
    this.novedad = new Novedad();
    this.msgNovedad="Recibimos su mensaje. Nos comunicaremos a su e-mail a la brevedad."
  }

  public borrarNovedadSeleccionada(): void {
    this._novedadService.deleteNovedad(this.novedadSeleccionada).subscribe(
      (result) => {
        this._toast.info("Novedad eliminada","Exito");
      },
      (error) => {
        console.log(error);
      }
    );
    this.novedadSeleccionada = new Novedad();
    this.cargarNovedades(); 
  }

  public modificarNovedadSeleccionada(): void {
    this._novedadService.updateNovedad(this.novedadSeleccionada).subscribe(
      (result) => {
        this._toast.info("Novedad Modificada","Exito");
      },
      (error) => {
        console.log(error);
      }
    );
    this.novedadSeleccionada = new Novedad();
    this.novedadSeleccionada.usuario= new Usuario();
    this.cargarNovedades();
  }

  public eliminarNovedadSeleccionada():void {
    this._novedadService.deleteNovedad(this.novedadSeleccionada).subscribe(
      (result) => {
        this._toast.info("Novedad Eliminada", "Exito");
      },
      (error) => {
        console.log(error);
      }
    );
    this.novedadSeleccionada = new Novedad();
    this.cargarNovedades();
  }

  public cargarNovedades(): void {
    this.novedades = new Array<Novedad>();
    this._novedadService.getNovedades().subscribe(
      (result) => {
        var novedad: Novedad = new Novedad();
        result.forEach(element => {
          Object.assign(novedad, element);
          this.novedades.push(novedad);
          novedad = new Novedad();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public seleccionarNovedad(novedad: Novedad): void {
    novedad.estado = this.estados.find(element=>element==novedad.estado);
    this.novedadSeleccionada = Object.assign({}, novedad);
    this.desactivarGuardar=true;
  }

  ngOnInit(): void {
  }

}
