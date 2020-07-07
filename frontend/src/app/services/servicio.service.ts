import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  urlBase: string = "http://localhost:3000/api/servicios/";

  constructor(private _http: HttpClient) {
    console.log("consumiendo servicio de Servicios");
  }
  getServicios(): Observable<any> {
    console.log("obtener servicios")
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get(this.urlBase, httpOptions);
  }

  addServicio(servicio: Servicio): Observable<any> {
    console.log("registrar servicio")
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(servicio);
    console.log(body);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  deleteServicio(servicio: Servicio): Observable<any> {
    console.log("borrar servicio")
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete(this.urlBase + servicio._id, httpOptions);
  }

  updateServicio(servicio: Servicio): Observable<any> {
    console.log("actualizar servicio")
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(servicio);
    console.log(body);
    return this._http.put(this.urlBase + servicio._id, body, httpOptions);
  }
}
