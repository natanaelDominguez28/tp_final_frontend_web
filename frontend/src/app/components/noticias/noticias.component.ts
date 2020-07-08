import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../models/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticia: Noticia;
  noticiaSeleccionada: Noticia;
  noticias: Array<Noticia>;
  desactivarGuardar = true;
  publicarEnFacebook=false;

  constructor(private _noticiaService: NoticiaService, public _loginService: LoginService) {
    this.cleanNoticia();
    this.cleanNoticiaSeleccionada();
    this.noticias = new Array<Noticia>();
    this.cargarNoticias();
  }

  public registrarNoticia(): void {
    this.noticia.fecha = new Date();
    this.noticia.usuario = this._loginService.userLogged;
    this._noticiaService.addNoticia(this.noticia).subscribe(
      (result) => {
        alert("Noticia publicada");
        this.cargarNoticias();
      },
      (error) => {
        console.log(error);
      }
    );
    if(this.publicarEnFacebook==true){
      this._noticiaService.publicarEnfb(this.noticia);
    }
    this.cleanNoticia();
  }

  public borrarNoticiaSeleccionada(): void {
    this._noticiaService.deleteNoticia(this.noticiaSeleccionada).subscribe(
      (result) => {
        alert("Noticia eliminada");
      },
      (error) => {
        console.log(error);
      }
    );
    this.noticiaSeleccionada = new Noticia();
    this.cargarNoticias();
    this.cleanNoticiaSeleccionada();
  }

  public modificarNoticiaSeleccionada(): void {
    this.noticiaSeleccionada.usuario = this._loginService.userLogged;
    this.noticiaSeleccionada.fecha = new Date();
    this._noticiaService.updateNoticia(this.noticiaSeleccionada).subscribe(
      (result) => {
        alert("Noticia modificada");
        this.cargarNoticias();
      },
      (error) => {
        console.log(error);
      }
    );
    this.cleanNoticiaSeleccionada();
  }

  public cargarNoticias(): void {
    this.noticias = new Array<Noticia>();
    this._noticiaService.getNoticias().subscribe(
      (result) => {
        var noticia: Noticia = new Noticia();
        result.forEach(element => {
          Object.assign(noticia, element);
          this.noticias.push(noticia);
          noticia = new Noticia();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public seleccionarNoticia(noticia: Noticia): void {
    this.noticiaSeleccionada = Object.assign({}, noticia);
    this.desactivarGuardar = true;
  }

  public cleanNoticia(): void {
    this.noticia = new Noticia();
    this.noticia.usuario = new Usuario();
    this.noticia.vigente = true;
    this.publicarEnFacebook=false;
  }

  public cleanNoticiaSeleccionada(): void {
    this.noticiaSeleccionada = new Noticia();
    this.noticiaSeleccionada.usuario = new Usuario()
    this.noticia.usuario = new Usuario();
    this.noticia.vigente = true;
  }

  public cambiarActivo(e): void {
    if (e.target.checked == true) {
      this.noticia.vigente = true;
    } else {
      this.noticia.vigente = false;
    }
  }

  public cambiarActivo2(e): void {
    if (e.target.checked == true) {
      this.noticiaSeleccionada.vigente = true;
    } else {
      this.noticiaSeleccionada.vigente = false;
    }
    this.desactivarGuardar = false;
  }

  public cambiarFacebook(e): void {
    if (e.target.checked == true) {
      this.publicarEnFacebook = true;
    } else {
      this.noticiaSeleccionada.vigente = false;
    }
    this.desactivarGuardar = false;
  }

  ngOnInit(): void {
  }

}
