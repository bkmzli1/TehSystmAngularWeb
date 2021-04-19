import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {CookieService} from 'ngx-cookie-service';
import {AppComponent} from '../app.component';
import {OrderComponent} from '../order/order.component';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isAdmin = false;
  notification = 0;


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public app: AppService, public appc: AppComponent) {
    this.appc.cont = true;
    this.http.get(this.app.serverURL + 'notifications/').subscribe((next: number) => {
      this.notification = next;
      this.uploadNotif();
    });
  }

  uploadNotif() {
    this.http.get(this.app.serverURL + 'notifications/').subscribe((next: number) => {
      this.notification = next;
      this.uploadNotif();
    });
  }

  ngOnInit(): void {
  }

  authenticated() {
    return this.app.authenticated;
  }


  cl() {
    console.log(1);
  }


}
