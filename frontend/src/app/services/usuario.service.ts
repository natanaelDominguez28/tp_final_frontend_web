import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase: string = "http://localhost:3000/api/usuarios/";

  constructor(private _http: HttpClient) {
    console.log("consumiendo servicio de Usuarios");
  }

  getUsuarios(): Observable<any> {
    console.log("obtener usuarios")
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.get(this.urlBase, httpOptions);
  }

  addUsuario(usuario: Usuario): Observable<any> {
    console.log("registrar usuario")
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(usuario);
    console.log(body);
    return this._http.post(this.urlBase, body, httpOptions);
  }

  deleteUsuario(usuario: Usuario): Observable<any> {
    console.log("borrar usuario")
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this._http.delete(this.urlBase + usuario._id, httpOptions);
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    console.log("actualizar usuario")
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(usuario);
    console.log(body);
    return this._http.put(this.urlBase + usuario._id, body, httpOptions);
  }
}
