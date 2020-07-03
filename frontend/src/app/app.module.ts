import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgxDataTableModule } from 'angular-9-datatable';
import { HttpClientModule } from '@angular/common/http';

//servicios
import { LoginService } from './services/login.service';
import { AfiliadoService } from './services/afiliado.service';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { NoticiasComponent } from './components/noticias/noticias.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AfiliadosComponent,
    UsuariosComponent,
    ServiciosComponent,
    PagosComponent,
    NovedadesComponent,
    NoticiasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDataTableModule,
    FormsModule

  ],

  //servicio
  providers: [
    LoginService,
    AfiliadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
