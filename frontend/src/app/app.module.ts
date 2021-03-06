import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDataTableModule } from 'angular-9-datatable';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FacebookModule } from 'ngx-fb';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';



//servicios
import { LoginService } from './services/login.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AfiliadoService } from './services/afiliado.service';
import { NoticiaService } from './services/noticia.service';
import { NovedadService } from './services/novedad.service';
import { PagoService } from './services/pago.service';
import { UsuarioService } from './services/usuario.service';
import { ImpresoraService } from './services/impresora.service';
import { ServicioService } from './services/servicio.service';

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
    FormsModule,
    FacebookModule.forRoot(),
    AlifeFileToBase64Module,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton:true,
      timeOut:3000,
      progressBar:true,
      progressAnimation:"increasing",
      extendedTimeOut:2500,
      maxOpened:7,
    })
  ],

  //servicio
  providers: [
    LoginService,
    AfiliadoService,
    NoticiaService,
    NovedadService,
    PagoService,
    ImpresoraService,
    ServicioService,
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
