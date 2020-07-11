import { Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import { LoginService } from 'src/app/services/login.service';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  pago: Pago;
  pagoSeleccionado: Pago;
  pagos: Array<Pago>;
  pagosJSON: JSON;
  afiliados: Array<Afiliado>;
  month: Array<string>;
  desactivarGuardar = true;

  constructor(private _pagoService: PagoService, public _loginService: LoginService, private _afiliadoService: AfiliadoService, private _toast: ToastrService) {
    this.cleanPago();
    this.cleanPagoSeleccionado();
    this.cargarPagos();
    this.cargarAfiliados();
    console.log(this.pago);
    this.month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  }

  public registrarPago(): void {
    console.log(this.pago);
    this._pagoService.addPago(this.pago).subscribe(
      (result) => {
        this._toast.success("Pago Registrado", "Exito");
        this.cleanPago();
      },
      (error) => {
        this._toast.error(error, "Error");
      }
    );
    this.cargarPagos();
  }

  public borrarPagoSeleccionado(): void {
    this._pagoService.deletePago(this.pagoSeleccionado).subscribe(
      (result) => {
        this._toast.info("Pago Eliminado", "Exito");
      },
      (error) => {
        this._toast.error(error, "error");
      }
    );
    this.pagoSeleccionado = new Pago();
    this.cargarPagos();
  }

  public modificarPagoSeleccionado(): void {
    this._pagoService.updatePago(this.pagoSeleccionado).subscribe(
      (result) => {
        this._toast.info("Pago Modificado", "Exito");
      },
      (error) => {
        this._toast.success(error, "Errror");
      }
    );
    this.cleanPagoSeleccionado();
    this.cargarPagos();
  }

  public cargarPagos(): void {
    this.pagos = new Array<Pago>();
    this._pagoService.getPagos().subscribe(
      (result) => {
        var pago: Pago = new Pago();
        this.pagosJSON = result;
        result.forEach(element => {
          Object.assign(pago, element);
          this.pagos.push(pago);
          pago = new Pago();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public imprimir(): void {
    printJS({
      printable: this.pagosJSON,
      properties: ['afiliado.dni', 'afiliado.apellido', 'afiliado.nombres', 'fecha', 'monto', "year", "mes"],
      type: 'json',
      header: '<h3 class="h3">Lista de Afiliados</h3>',
      gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;',
      gridStyle: 'border: 2px solid #3971A5;'
    })
  }

  public cargarAfiliados(): void {
    this.afiliados = new Array<Afiliado>();
    this._afiliadoService.getAfiliados().subscribe(
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
    console.log(this.afiliados);
  }

  public seleccionarPago(pago: Pago): void {
    pago.mes = this.month.find(element => element == pago.mes);
    pago.afiliado = this.afiliados.find(element => element == pago.afiliado);
    this.pagoSeleccionado = Object.assign({}, pago);
    this.desactivarGuardar = true;
  }

  public cleanPago(): void {
    this.pago = new Pago();
    this.pago.afiliado = new Afiliado();
    this.pago.fecha = new Date();
    this.pago.afiliado.nombres = "";
    this.pago.afiliado.apellido = "";
  }
  public cleanPagoSeleccionado(): void {
    this.pagoSeleccionado = new Pago();
    this.pagoSeleccionado.afiliado = new Afiliado();
    this.pagoSeleccionado.afiliado.nombres = "";
    this.pagoSeleccionado.afiliado.apellido = "";
    this.pagoSeleccionado.fecha = new Date();
  }

  ngOnInit(): void {
  }

}
