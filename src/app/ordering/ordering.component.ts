import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


class User {
  id: string;
  name: string;
  img: string;
  email: string;
  telephone: string;
  lastName = ' ';
  firstName = ' ';
  middleName = ' ';
}


class Img {
  img: string;
  name: string;
}

class Massages {
  user: User;
  imgs: Img[];
  text = ' ';

}

class Orders {
  name: string;
  done: boolean;
  executed: string;
  crate: string;
  creator: User = new User();
  executor: User[] = [];
  text = ' ';
  imgs: Img[] = [];
  id = ' ';
  massages: Massages[] = [];
}

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css']
})
export class OrderingComponent implements OnInit {

  orders: Orders[] = [];

  constructor(private app: AppService, private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.http.get(app.serverURL + 'task/tasking').subscribe((response: Orders[]) => {

      this.orders = response;
    });
  }

  ngOnInit(): void {
  }

  text(id: string) {
    this.router.navigateByUrl('/order/' + id);
  }

}
