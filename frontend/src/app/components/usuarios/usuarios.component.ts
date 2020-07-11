import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../services/usuario.service'
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarioa: Usuario;
  usuarioSeleccionado: Usuario;
  usuarios: Array<Usuario>;
  usuariosJSON: JSON;
  perfiles = ["socio", "administrativo", "administrador", "gerente"];
  desactivarGuardar = true;

  constructor(private _usuarioService: UsuarioService, public _loginService: LoginService, private _toast: ToastrService) {
    this.cleanUsuario();
    this.usuarioSeleccionado = new Usuario();
    this.usuarioSeleccionado.activo = true;
    this.cargarUsuarios();
    console.log(this.usuarioa);
    this.cargarPerfiles();

  }

  public registrarUsuario(): void {
    console.log(this.usuarioa);
    this._usuarioService.addUsuario(this.usuarioa).subscribe(
      (result) => {
        if (result.status == 1) {
          this._toast.success(result.message, "Exito");
          this.cleanUsuario();
        } if (result.status == 2) {
          this._toast.error(result.message, "Error");
        }
        console.log(result);
      },
      (error) => {
        this._toast.error(error, "Error");
      }
    );
    this.cargarUsuarios();
  }

  public borrarUsuarioSeleccionado(): void {
    this._usuarioService.deleteUsuario(this.usuarioSeleccionado).subscribe(
      (result) => {
        if (result.status == 1)
          this._toast.info(result.message, "Exito");
      },
      (error) => {
        this._toast.error(error, "Error");
      }
    );
    this.usuarioSeleccionado = new Usuario();
    this.cargarUsuarios();
  }

  public modificarUsuarioSeleccionado(): void {
    this._usuarioService.updateUsuario(this.usuarioSeleccionado).subscribe(
      (result) => {
        if (result.status == 1) {
          this._toast.info(result.message, "Exito");
        }
      },
      (error) => {
        this._toast.error(error, "Error");
      }
    );
    this.cargarUsuarios();
  }

  public cargarUsuarios(): void {
    this.usuarios = new Array<Usuario>();
    if (this._loginService.userLogged.perfil == "gerente") {
      this._usuarioService.getUsuarios().subscribe(
        (result) => {
          var usuario: Usuario = new Usuario();
          this.usuariosJSON = result;
          result.forEach(element => {
            Object.assign(usuario, element);
            this.usuarios.push(usuario);
            usuario = new Usuario();
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this._usuarioService.getUsuarios().subscribe(
        (result) => {
          var usuario: Usuario = new Usuario();
          this.usuariosJSON = result;
          result.forEach(element => {
            if (element.perfil != "gerente") {
              Object.assign(usuario, element);
              this.usuarios.push(usuario);
              usuario = new Usuario();
            }
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  public imprimir(): void {
    printJS({
      printable: this.usuariosJSON,
      properties: ['usuario', 'perfil', 'activo'],
      type: 'json',
      header: '<h3 class="h3">Lista de Afiliados</h3>',
      gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;',
      gridStyle: 'border: 2px solid #3971A5;'
    })
  }

  public seleccionarUsuario(usuario: Usuario): void {
    usuario.perfil = this.perfiles.find(element => element == usuario.perfil);
    this.usuarioSeleccionado = Object.assign({}, usuario);
    this.desactivarGuardar = true;
  }

  public cleanUsuario(): void {
    this.usuarioa = new Usuario();
    this.usuarioa.usuario = "";
    this.usuarioa.password = "";
    this.usuarioa.perfil = "socio";
    this.usuarioa.activo = true;
  }

  cambiarActivo(e): void {
    if (e.target.checked == true) {
      this.usuarioa.activo = true;
    } else {
      this.usuarioa.activo = false;
    }
  }

  cambiarActivo2(e): void {
    if (e.target.checked == true) {
      this.usuarioSeleccionado.activo = true;
    } else {
      this.usuarioSeleccionado.activo = false;
    }
    this.desactivarGuardar = false;
  }

  public cargarPerfiles(): void {
    if (this._loginService.userLogged.perfil == "gerente") {
      this.perfiles = ["socio", "administrativo", "administrador", "gerente"];
    }
    else {
      if (this._loginService.userLogged.perfil == "administrador") {
        this.perfiles = ["socio", "administrativo", "administrador"];
      } else {
        this.perfiles = [""];
      }
    }
  }
  ngOnInit(): void {
  }

}
