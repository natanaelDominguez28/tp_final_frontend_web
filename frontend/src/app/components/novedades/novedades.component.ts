import { Component, OnInit } from '@angular/core';
import { Novedad } from '../../models/novedad';
@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  novedad: Novedad;


  constructor() { }

  public registrarNovedad():void{

  }

  ngOnInit(): void {
  }

}
