import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import { HomeComponent} from './components/home/home.component';
import { AfiliadosComponent} from './components/afiliados/afiliados.component';
import { NoticiasComponent} from './components/noticias/noticias.component';
import { NovedadesComponent} from './components/novedades/novedades.component';
import { PagosComponent} from './components/pagos/pagos.component';
import { ServiciosComponent} from './components/servicios/servicios.component';
import { UsuariosComponent} from './components/usuarios/usuarios.component';



const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'home', component:HomeComponent},
  { path: 'afiliados', component:AfiliadosComponent},
  { path: 'noticias', component:NoticiasComponent},
  { path: 'novedades', component:NovedadesComponent},
  { path: 'pagos', component:PagosComponent},
  { path: 'servicios', component:ServiciosComponent},
  { path: 'usuarios', component:UsuariosComponent},
  { path: '', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
