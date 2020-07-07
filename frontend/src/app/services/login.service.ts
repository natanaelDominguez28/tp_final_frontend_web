import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlBase: string = "http://localhost:3000/api/usuarios/login";
  userLoggedIn: boolean = false;
  userLogged: Usuario;

  constructor(private _http: HttpClient) {
    this.userLogged = new Usuario();
  }

  public login(usuario: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ usuario: usuario, password: password });
    return this._http.post(this.urlBase, body, httpOption);
  }

  public logout() {
    this.userLogged = new Usuario();
    this.userLoggedIn = false;
    //se elimina el token de sessionStorage
    sessionStorage.removeItem("token");

  }

  getToken(): string {
    return sessionStorage.getItem("token");
  }

}
