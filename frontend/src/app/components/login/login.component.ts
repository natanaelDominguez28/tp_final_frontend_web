import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: Usuario = new Usuario();
  returnUrl: string;
  msglogin: string;
  recuerdame = false;

  constructor(private _route: ActivatedRoute, private _router: Router, private _loginService: LoginService) { }

  ngOnInit(): void {
  }

  login() {
    this._loginService.login(this.userform.usuario, this.userform.password)
      .subscribe(
        (result) => {
          var user = result;
          console.log(user);
          if (user.status == 1) {
            //el token se guarda localmente
            sessionStorage.setItem("token", user.token);
            //vbles para mostrar-ocultar cosas en el header
            this._loginService.userLoggedIn = true;
            this._loginService.userLogged = user.usuarioCompleto;
            //redirigimos a home o a pagina que llamo
            this._router.navigateByUrl(this.returnUrl);
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Usuario y/o contraseña incorrecta";
          }
        },
        error => {
          console.log("error en conexion");
          console.log(error);
        });
    console.log("usuario logeado" + this._loginService.userLogged);
  }

  public cambiarActivo(e): void {
    if (e.target.checked == true) {
      this.recuerdame = true;
    } else {
      this.recuerdame = false;
    }
  }

}
