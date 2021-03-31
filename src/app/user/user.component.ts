import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {AppComponent} from '../app.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  data = false;
  id: string;
  login = new Login();


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public app: AppService, public appc: AppComponent) {
    this.route.params.subscribe((params: any) => this.id = params.id);
    this.route.queryParams.subscribe(params => {
      this.data = params['data'];
    });
    this.http.get(this.app.serverURL + 'user/' + this.id).subscribe((next: Login) => {
      this.login = next;
      console.log(this.login);
    });
    this.appc.cont = false;
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('data'));
    });
  }


  bolConvertor(s: any) {
    if (s == true) {
      return 'да';
    } else if (s == false) {
      return 'нет';
    } else {
      return s;
    }
  }
}
