import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AppComponent} from '../app.component';
import {FormBuilder, FormGroup} from '@angular/forms';

class User {
  username: string;
  password = '';
  confirmPassword = '';
  email: string;
  admin = false;
  executor = false;
  telephone: string;
  firstName: string;
  lastName: string;
  middleName: string;
  nameError = false;
  passwordError = false;
  cPasswordError = false;
  id: string;

}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = new User();
  error = '';
  successful: string[] = [];
  name: any;

  form: FormGroup;
  private id: string;
  password = true;

  constructor(private app: AppService, private http: HttpClient, private router: Router, private cookieService: CookieService, public appc: AppComponent, fb: FormBuilder, private route: ActivatedRoute,) {
    this.route.params.subscribe((params: any) => this.id = params.id);
    this.http.get(this.app.serverURL + 'user/' + this.id).subscribe((next: User) => {
      next.password = '';
      this.user = next;
      console.log(this.user);
    });
    this.form = fb.group({
      phone: ['']
    });
    this.appc.cont = true;
  }

  ngOnInit(): void {
  }

  crate() {
    this.successful = [];
    this.error = '';
    const UserRegisterBindingModel = {
      id: this.user.id,
      username: this.user.username,
      password: this.user.password,
      confirmPassword: this.user.confirmPassword,
      email: this.user.email,
      admin: this.user.admin,
      executor: this.user.executor,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      middleName: this.user.middleName,
      nameError: this.user.nameError,
      passwordError: this.user.passwordError,
      cPasswordError: this.user.cPasswordError,
      telephone: this.user.telephone,
      passordof: this.password,
    };
    console.log(UserRegisterBindingModel);
    this.http.post(this.app.serverURL + 'edituserapi', UserRegisterBindingModel).subscribe((next: any) => {
      console.log(next);
      this.error = next.error;
      if (next.error == null) {
        this.successful = ['Данные пользователя именины'];
      }

    });
  }

  bole(b) {
    console.log(b);
  }
}
