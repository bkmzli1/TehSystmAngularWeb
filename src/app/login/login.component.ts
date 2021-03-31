import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};
  error;

  constructor( private app: AppService, private http: HttpClient, private router: Router, private cookieService: CookieService, public appc: AppComponent) {
    this.appc.cont = true;


  }

  login() {
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/home');
    });

  }

  ngOnInit(): void {
  }


}
