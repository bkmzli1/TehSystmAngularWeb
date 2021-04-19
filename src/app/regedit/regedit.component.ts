import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AppComponent} from '../app.component';


class Role {
  authority: string;
}

class Img {
  img = '';
}

class Login {
  id = '';
  username = ' ';
  img: Img = new Img();
  imgFon: Img = new Img();
  authorities: Role[] = [];
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  telephone: string;
  accountNonExpired: string;
  accountNonLocked: string;
  enabled: string;
  credentialsNonExpired: string;
}

@Component({
  selector: 'app-regedit',
  templateUrl: './regedit.component.html',
  styleUrls: ['./regedit.component.css']
})
export class RegeditComponent implements OnInit {

   logins: Login[] = [];

  constructor(private app: AppService, private http: HttpClient, private router: Router, private cookieService: CookieService, public appc: AppComponent) {
    this.http.get(this.app.serverURL + 'allusers').subscribe((next: Login[]) => {
      this.logins = next;

    });
    this.appc.cont = false;
  }

  ngOnInit(): void {
  }

  text(id) {
    this.router.navigateByUrl('/useredit/' + id);
  }
}
