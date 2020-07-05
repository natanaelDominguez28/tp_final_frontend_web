import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Afiliado } from '../models/afiliado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {
  urlBase: string = "http://localhost:3000/api/afiliados/";

  constructor(private _http: HttpClient) {
    console.log("consumiendo servicio de Afiliados");
  }

  getAfiliados():Observable<any>{
    console.log("obtener afiliados")
    const httpOptions={
      headers:new HttpHeaders({

      })
    };
    return this._http.get(this.urlBase,httpOptions);
  }

  addAfiliado(afiliado:Afiliado):Observable<any>{
    console.log("registrar afiliado")
    const httpOptions={
      headers:new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
    var body=JSON.stringify(afiliado);
    console.log(body);
    return this._http.post(this.urlBase,body,httpOptions);
  }

  deleteAfiliado(afiliado:Afiliado):Observable<any>{
    console.log("borrar afiliado")
    const httpOptions={
      headers:new HttpHeaders({

      })
    };
    return this._http.delete(this.urlBase+afiliado._id,httpOptions);
  }

  updateAfiliado(afiliado:Afiliado):Observable<any>{
    console.log("actualizar afiliado")
    const httpOptions={
      headers:new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
    var body=JSON.stringify(afiliado);
    console.log(body);
    return this._http.put(this.urlBase+afiliado._id,body,httpOptions);
  }
}
