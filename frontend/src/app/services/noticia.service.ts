import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  urlBase: string = "http://localhost:3000/api/noticias/";

  constructor(private _http: HttpClient) {
    console.log("consumiendo servicio de Noticias");
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

}
