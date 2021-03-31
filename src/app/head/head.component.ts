import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {CookieService} from 'ngx-cookie-service';
import {AppComponent} from '../app.component';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isAdmin = false;

  constructor(public app: AppService, public appc: AppComponent) {
    this.appc.cont = true;
  }

  ngOnInit(): void {
  }

  authenticated() {
    return this.app.authenticated;
  }


}
