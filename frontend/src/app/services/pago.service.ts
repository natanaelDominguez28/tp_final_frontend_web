import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  urlBase: string = "http://localhost:3000/api/pagos/";

  constructor(private _http: HttpClient) {
    console.log("consumiendo servicio de Pagos");
  }

  getPagos(): Observable<any> {
    console.log("obtener pagos")
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get(this.urlBase, httpOptions);
  }

  addPago(pago: Pago): Observable<any> {
    console.log("registrar pago")
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(pago);
    console.log(body);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  deletePago(pago: Pago): Observable<any> {
    console.log("borrar pago")
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete(this.urlBase + pago._id, httpOptions);
  }

  updatePago(pago: Pago): Observable<any> {
    console.log("actualizar pago")
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(pago);
    console.log(body);
    return this._http.put(this.urlBase + pago._id, body, httpOptions);
  }
}
