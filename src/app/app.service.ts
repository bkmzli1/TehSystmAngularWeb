import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

class Role {
  authority: string;
}

class Img {
  img: string;
}

class Login {
  id = '';
  username = ' ';
  img: Img;
  imgFon: Img;
  authorities: Role[] = [];
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  telephone: string;
}

@Injectable()
export class AppService {
  isAdmin = false;
  serverURL2 = '//localhost/';
  serverURL = '';
  authenticated = false;
  login: Login = new Login();

  imgs: string[];

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    http.get(this.serverURL + 'usersss').subscribe((next: Login) => {
      if (next != undefined || next != null) {
        this.authenticated = true;
        this.login = next;
      }
    });
  }

  isRoot() {
    let item;

    for (item of this.login.authorities) {
      this.isAdmin = (item.authority === 'ADMIN') && (this.isAdmin !== true);
    }
    return this.isAdmin;

  }

  authenticate(credentials, callback) {
    this.authenticated = false;
    let headers;
    headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});
    this.http.get(this.serverURL + 'user', {headers}).subscribe((response: Login) => {
      this.login = response;

      if (this.login.username) {
        this.authenticated = true;
        console.log(12);
        callback();
      } else {
        this.authenticated = false;
      }


      this.cookieService.set('ps', credentials.password);
      this.cookieService.set('us', credentials.username);

      return callback && callback();
    });

  }


  imgLoad(fileToUpload: FormData, type: string) {

    if (!this.authenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');

    this.http.post(this.serverURL + 'img/' + type, fileToUpload, {headers}).subscribe(
      (next2: string[]) => {
        this.imgs = next2;
      },
      error2 => console.log(error2)
    );
    return this.imgs;
  }


}
