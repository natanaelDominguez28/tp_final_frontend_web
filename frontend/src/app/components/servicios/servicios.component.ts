import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/servicio'
  import { from } from 'rxjs';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  servicio: Servicio;

  constructor(private _servicioService:ServicioService) { }

  ngOnInit(): void {
  }

}
