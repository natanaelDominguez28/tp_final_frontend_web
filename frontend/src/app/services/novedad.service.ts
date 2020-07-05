import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Novedad } from '../models/novedad';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {
  urlBase: string = "http://localhost:3000/api/novedades/";

  constructor(private _http: HttpClient) {
    console.log("consumiendo servicio de Novedades");
  }

  getNovedades(): Observable<any> {
    console.log("obtener novedades")
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get(this.urlBase, httpOptions);
  }

  addNovedad(novedad: Novedad): Observable<any> {
    console.log("registrar novedad")
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(novedad);
    console.log(body);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  deleteNovedad(novedad:Novedad):Observable<any>{
    console.log("borrar novedad")
    const httpOptions={
      headers:new HttpHeaders({

      })
    };
    return this._http.delete(this.urlBase+novedad._id,httpOptions);
  }

  updateNovedad(novedad:Novedad):Observable<any>{
    console.log("actualizar novedad")
    const httpOptions={
      headers:new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
    var body=JSON.stringify(novedad);
    console.log(body);
    return this._http.put(this.urlBase+novedad._id,body,httpOptions);
  }

}
