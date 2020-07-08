import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia';
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';


@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  urlBase: string = "http://localhost:3000/api/noticias/";
  access_token: string = "EAAC2C8riQeIBAOYZB8ibIKfjR1IZCHypHUyZCpjHlucfCQu1tEMiCZCONDpzXQtFCW0sh3eSLBLzOMDAdqSMErtxj26WbVxW79o9YBZCEw0SNbvGqZA8DJVVpmr1YgONP6VfCzp6lpRM1KZAce73W1RdpNthizplsH2ByOrjZAb5dRLdHYF4vWO5yYheHtsImRBUPwER00vp0QZDZD";
  idPage: string = "112141137231658";
  constructor(private fb: FacebookService, private _http: HttpClient,) {
    console.log("consumiendo servicio de Noticiass");
    this.iniciarFb();

  }

  getNoticias(): Observable<any> {
    console.log("obtener noticias")
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get(this.urlBase, httpOptions);
  }

  addNoticia(noticia: Noticia): Observable<any> {
    console.log("registrar noticia")
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(noticia);
    console.log(body);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  deleteNoticia(noticia: Noticia): Observable<any> {
    console.log("borrar noticia")
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete(this.urlBase + noticia._id, httpOptions);
  }

  updateNoticia(noticia: Noticia): Observable<any> {
    console.log("actualizar noticia")
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(noticia);
    console.log(body);
    return this._http.put(this.urlBase + noticia._id, body, httpOptions);
  }

  publicarEnfb(noticia:Noticia,) {
    var apiMethod: ApiMethod = "post";
    this.fb.api('/'+this.idPage+'/feed', apiMethod,
      {
        "message": noticia.titulo+"  -  "+noticia.descripcion,
        "access_token": this.access_token
      });
    console.log("Noticia Publicada en Facebook");
  }


  iniciarFb() {
    let initParams: InitParams = {
      appId: '200161764721122',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v7.0'
    };
    this.fb.init(initParams);
  }


}
