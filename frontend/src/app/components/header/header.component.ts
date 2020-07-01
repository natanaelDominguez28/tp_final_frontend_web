import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _loginService: LoginService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
  }


  
  onLoginButtonClick(){
    this._router.navigate(['/login']);
  }
  onLogoutButtonClick(){
    this.logout();
    this._router.navigate(['/login']);
  }
  logout(){
    this._loginService.logout();
    }
}
