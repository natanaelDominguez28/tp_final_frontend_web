import { Component, OnInit } from '@angular/core';
import { Afiliado } from '../../models/afiliado'
import { AfiliadoService } from 'src/app/services/afiliado.service';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit {
  afiliado: Afiliado;
  afiliadoSeleccionado:Afiliado;
  afiliados: Array<Afiliado>;

  constructor(private _afiliadoService: AfiliadoService) {
    this.afiliado = new Afiliado();
    this.afiliadoSeleccionado = new Afiliado();
    this.cargarAfiliados();
  }

  ngOnInit(): void {
  }

  public cargarAfiliados() {
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
    )
  }

  public registrarAfiliado() {
    this._afiliadoService.addAfiliado(this.afiliado).subscribe(
      (result) => {
        alert("Afiliado enviado");
      },
      (error) => {
        console.log(error);
      }
    )
    this.afiliado= new Afiliado();
    this.cargarAfiliados();
  }

  public seleccionarAfiliado(afiliado:Afiliado){
    this.afiliadoSeleccionado=afiliado;
  }
}
