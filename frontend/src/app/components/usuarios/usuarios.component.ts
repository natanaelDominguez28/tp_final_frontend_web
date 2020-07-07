import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../services/usuario.service'
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarioa: Usuario;
  usuarioSeleccionado: Usuario;
  usuarios: Array<Usuario>;
  perfiles = ["socio", "administrativo", "administrador"];
  desactivarGuardar = true;

  constructor(private _usuarioService: UsuarioService, public _loginService: LoginService) {
    this.cleanUsuario();
    this.usuarioSeleccionado = new Usuario();
    this.usuarioSeleccionado.activo = true;
    this.cargarUsuarios();
    console.log(this.usuarioa);

  }

  public registrarUsuario(): void {
    console.log(this.usuarioa);
    this._usuarioService.addUsuario(this.usuarioa).subscribe(
      (result) => {
        alert("Usuario registrado");
      },
      (error) => {
        console.log(error);
      }
    );
    this.cleanUsuario();
    this.cargarUsuarios();
  }

  public borrarNovedadSeleccionada(): void {
    this._usuarioService.deleteUsuario(this.usuarioSeleccionado).subscribe(
      (result) => {
        alert("Usuario eliminado");
      },
      (error) => {
        console.log(error);
      }
    );
    this.usuarioSeleccionado = new Usuario();
    this.cargarUsuarios();
  }

  public modificarUsuarioSeleccionado(): void {
    this._usuarioService.updateUsuario(this.usuarioSeleccionado).subscribe(
      (result) => {
        alert("Usuario modificado");
      },
      (error) => {
        console.log(error);
      }
    );
    this.usuarioSeleccionado = new Usuario();
    this.cargarUsuarios();
  }

  public cargarUsuarios(): void {
    this.usuarios = new Array<Usuario>();
    this._usuarioService.getUsuarios().subscribe(
      (result) => {
        var usuario: Usuario = new Usuario();
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

  ngOnInit(): void {
  }

}
