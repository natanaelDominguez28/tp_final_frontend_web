import { Injectable } from '@angular/core';
import * as PrintJS from'print-js';
import * as printJS from 'print-js';
@Injectable({
  providedIn: 'root'
})
export class ImpresoraService {

  constructor() { 
    console.log("consumiendo servicio de printJS");
  }

  public imprimirLista(array:Array<any>):void{
    var objJSON = JSON.stringify(array)
    
    printJS({printable:objJSON,type:'json',});
  }
}
