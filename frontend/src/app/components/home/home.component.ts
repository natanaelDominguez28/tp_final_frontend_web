import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from 'src/app/models/noticia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  noticias: Array<Noticia>;

  constructor(private _noticiaService: NoticiaService) {
    this.noticias = new Array<Noticia>();
    this.cargarNoticias();
  }

  ngOnInit(): void {
  }

  public cargarNoticias(): void {
    this.noticias = new Array<Noticia>();
    this._noticiaService.getNoticiasActivas().subscribe(
      (result) => {
        var noticia: Noticia = new Noticia();
        result.forEach(element => {
          Object.assign(noticia, element);
          this.noticias.push(noticia);
          noticia = new Noticia();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
