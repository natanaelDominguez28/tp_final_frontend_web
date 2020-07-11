import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _loginService: LoginService) {
  }
  ngOnInit(): void {
    sessionStorage.removeItem("token");
  }

  title = 'Obra Social';
}
