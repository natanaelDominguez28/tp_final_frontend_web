import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio'
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicio: Servicio;
  servicioSeleccionado: Servicio;
  servicios: Array<Servicio>;
  afiliados: Array<Afiliado>;
  afiliado: Afiliado;
  desactivarGuardar = true;
  desactivarAgregar = true;

  constructor(private _servicioService: ServicioService, private _servicioAfiliado: AfiliadoService) {
    this.afiliado = new Afiliado();
    this.cleanServicio();
    this.cleanServicioSeleccionado();
    this.servicios = new Array<Servicio>();
    this.cargarServicios();
    this.cargarAfiliados();
  }

  public registrarServicio(): void {
    this._servicioService.addServicio(this.servicio).subscribe(
      (result) => {
        alert("Servicio registrado");
        this.cargarServicios();
      },
      (error) => {
        console.log(error);
      }
    );
    this.cleanServicio();
  }

  public borrarServicioSeleccionado(): void {
    this._servicioService.deleteServicio(this.servicioSeleccionado).subscribe(
      (result) => {
        alert("Servicio eliminado");
      },
      (error) => {
        console.log(error);
      }
    );
    this.cargarServicios();
    this.cleanServicioSeleccionado();
  }

  public modificarServicioSeleccionado(): void {
    this._servicioService.updateServicio(this.servicioSeleccionado).subscribe(
      (result) => {
        alert("Servicio modificado");
        this.cargarServicios();
      },
      (error) => {
        console.log(error);
      }
    );
    this.cleanServicioSeleccionado();
  }

  public cargarServicios(): void {
    this.servicios = new Array<Servicio>();
    this._servicioService.getServicios().subscribe(
      (result) => {
        var servicio: Servicio = new Servicio();
        result.forEach(element => {
          Object.assign(servicio, element);
          this.servicios.push(servicio);
          servicio = new Servicio();
        });
      },
      (error) => {
        console.log(error);
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
    this.desactivarGuardar = false;
    this.desactivarAgregar = true;
  }

  public borrarAfiliado(afiliado: Afiliado): void {
    var indice = this.servicioSeleccionado.afiliadosInsc.findIndex((element) => element._id == afiliado._id);
    this.servicioSeleccionado.afiliadosInsc.splice(indice, 1);
  }

  public seleccionarServicio(noticia: Servicio): void {
    this.servicioSeleccionado = Object.assign({}, noticia);
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
