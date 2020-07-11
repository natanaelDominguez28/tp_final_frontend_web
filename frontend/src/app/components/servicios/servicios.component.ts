import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio'
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicio: Servicio;
  servicioSeleccionado: Servicio;
  servicios: Array<Servicio>;
  serviciosActivos: Array<Servicio>;
  serviciosJSON: JSON;
  afiliados: Array<Afiliado>;
  afiliadosJSON: JSON;
  afiliado: Afiliado;
  desactivarGuardar = true;
  desactivarAgregar = true;

  constructor(private _servicioService: ServicioService, private _servicioAfiliado: AfiliadoService, public _loginService: LoginService, private _toast: ToastrService) {
    this.afiliado = new Afiliado();
    this.cleanServicio();
    this.cleanServicioSeleccionado();
    this.servicios = new Array<Servicio>();
    this.cargarServicios();
    this.serviciosActivos = new Array<Servicio>();
    this.cargarServiciosActivos()
    this.cargarAfiliados();
  }

  public registrarServicio(): void {
    this._servicioService.addServicio(this.servicio).subscribe(
      (result) => {
        this._toast.success("Servicio Registrado", "Exito");
        this.cargarServicios();
      },
      (error) => {
        this._toast.error(error, "Error");
      }
    );
    this.cleanServicio();
  }

  public borrarServicioSeleccionado(): void {
    this._servicioService.deleteServicio(this.servicioSeleccionado).subscribe(
      (result) => {
        this._toast.info("Servicio Eliminado", "Exito");
      },
      (error) => {
        this._toast.error(error, "Error");
      }
    );
    this.cargarServicios();
    this.cleanServicioSeleccionado();
  }

  public modificarServicioSeleccionado(): void {
    this._servicioService.updateServicio(this.servicioSeleccionado).subscribe(
      (result) => {
        this._toast.info("Servicio Modificado", "Exito");
        this.cargarServicios();
      },
      (error) => {
        this._toast.error(error, "Error");
      }
    );
    this.cleanServicioSeleccionado();
  }

  public cargarServicios(): void {
    this.servicios = new Array<Servicio>();
    this._servicioService.getServicios().subscribe(
      (result) => {
        this.serviciosJSON = result;
        var servicio: Servicio = new Servicio();
        result.forEach(element => {
          Object.assign(servicio, element);
          this.servicios.push(servicio);
          servicio = new Servicio();
        });
      },
      (error) => {
        this._toast.error(error, "Error");
      }
    );
  }

  public cargarServiciosActivos(): void {
    this.servicios = new Array<Servicio>();
    this._servicioService.getServiciosActivos().subscribe(
      (result) => {
        var servicio: Servicio = new Servicio();
        result.forEach(element => {
          Object.assign(servicio, element);
          this.serviciosActivos.push(servicio);
          servicio = new Servicio();
        });
      },
      (error) => {
        this._toast.error(error, "Error");
      }
    );
  }

  public cargarAfiliados(): void {
    this.afiliados = new Array<Afiliado>();
    this._servicioAfiliado.getAfiliados().subscribe(
      (result) => {
        var afiliado: Afiliado = new Afiliado();
        result.forEach(element => {
          Object.assign(afiliado, element);
          this.afiliados.push(afiliado);
          afiliado = new Afiliado();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public agregarAfiliado(): void {
    this.servicioSeleccionado.afiliadosInsc.push(this.afiliado);
    this.afiliado = new Afiliado();
    this.desactivarGuardar = false;
    this.desactivarAgregar = true;
  }

  public borrarAfiliado(afiliado: Afiliado): void {
    var indice = this.servicioSeleccionado.afiliadosInsc.findIndex((element) => element._id == afiliado._id);
    this.servicioSeleccionado.afiliadosInsc.splice(indice, 1);
    this.desactivarGuardar = false;
  }

  public seleccionarServicio(noticia: Servicio): void {
    this.servicioSeleccionado = Object.assign({}, noticia);
    this.afiliadosJSON = JSON.parse(JSON.stringify(this.servicioSeleccionado.afiliadosInsc));
    this.desactivarGuardar = true;
    this.desactivarAgregar = true;
    this.cargarAfiliados();
  }

  public cleanServicio(): void {
    this.servicio = new Servicio();
    this.servicio.afiliadosInsc = new Array<Afiliado>();
    this.servicio.activo = true;
  }

  public cleanServicioSeleccionado(): void {
    this.servicioSeleccionado = new Servicio();
    this.servicioSeleccionado.afiliadosInsc = new Array<Afiliado>();
    this.servicio.activo = true;
  }

  public cambiarActivo(e): void {
    if (e.target.checked == true) {
      this.servicio.activo = true;
    } else {
      this.servicio.activo = false;
    }
  }

  public inscribirme(servicio: Servicio): void {
    var afiliadoYaInscripto = false;
    for (var i = 0; i < servicio.afiliadosInsc.length; i++) {
      if (servicio.afiliadosInsc[i].email == this._loginService.userLogged.usuario) {
        afiliadoYaInscripto = true;
      }
    }
    this._servicioAfiliado.buscarAfiliado(this._loginService.userLogged.usuario).subscribe(
      (result) => {
        if (result.status == 2) {
          this._toast.error(result.message, "Error");
        }
        if (result.status == 1 && afiliadoYaInscripto == false) {
          servicio.afiliadosInsc.push(result.afiliado);
          this._servicioService.updateServicio(servicio).subscribe(
            (result) => {
              this._toast.info("Te has inscripto correctamente", "Exito");
            },
            (error) => {
              this._toast.error(error, "Error");
            }
          );
        } else {
          this._toast.error("Ya estas inscripto", "Error");
        }
      },
      (error) => {
        this._toast.error(error, "Error");
      }
    );
    this.cleanServicio();
  }

  public imprimir(): void {
    printJS({
      printable: this.serviciosJSON,
      properties: ['nombre', 'activo'],
      type: 'json',
      header: '<h3 class="h3">Lista de Servicios</h3>',
      gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;',
      gridStyle: 'border: 2px solid #3971A5;'
    })
  }
  public imprimirAfiliados(): void {
    printJS({
      printable: this.afiliadosJSON,
      properties: ['dni', 'apellido', 'nombre', "email", "telefono"],
      type: 'json',
      header: ['<h3 class="h3">Lista de afiliados inscriptos</h3>'],
      gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;',
      gridStyle: 'border: 2px solid #3971A5;'
    })
  }

  public subirImagen(files): void {
    console.log("ARCHIVO CONVERTIDO", files);
    this.servicio.imagen = files[0].base64;
  }

  public subirImagen2(files): void {
    console.log("ARCHIVO CONVERTIDO", files);
    this.servicioSeleccionado.imagen = files[0].base64;
    this.desactivarGuardar = false;
  }

  public cambiarActivo2(e): void {
    if (e.target.checked == true) {
      this.servicioSeleccionado.activo = true;
    } else {
      this.servicioSeleccionado.activo = false;
    }
    this.desactivarGuardar = false;
  }

  ngOnInit(): void {
  }

}
