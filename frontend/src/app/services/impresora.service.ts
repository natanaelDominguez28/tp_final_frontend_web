import { Injectable } from '@angular/core';
import * as printJS from 'print-js';
import { Afiliado } from '../models/afiliado';
@Injectable({
  providedIn: 'root'
})
export class ImpresoraService {
  afiliadoJSON:JSON;
  constructor() {
    console.log("consumiendo servicio de printJS");
  }

  public imprimirAfiliados(array: Array<Afiliado>): void {
    this.afiliadoJSON.stringify(array);
    
    printJS({ printable: this.afiliadoJSON, properties: ['dni', 'apellido', 'nombres', 'email', 'telefono'], type: 'json' });
  }
  public imprimirUsuarios(array: Array<any>): void {
    var objJSON = JSON.stringify(array)
    printJS({ printable: objJSON, properties: ['usuario', 'perfil'], type: 'json' });
  }
  public imprimirServicios(array: Array<any>): void {
    var objJSON = JSON.stringify(array)
    printJS({ printable: objJSON, properties: ['nombre'], type: 'json' });
  }
  public imprimirAfiliadosInscriptos(array: Array<any>): void {
    var objJSON = JSON.stringify(array)
    printJS({ printable: objJSON, properties: ['dni', 'apellido', 'nombres', 'email', 'telefono'], type: 'json' });
  }
  public imprimirPagos(array: Array<any>): void {
    var objJSON = JSON.stringify(array)
    printJS({ printable: objJSON, properties: ['afiliado.dni', 'fecha', 'monto', 'mes', 'año'], type: 'json' });
  }
}
