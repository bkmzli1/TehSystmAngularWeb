import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeadComponent} from './head/head.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ordersCreate', component: CreateOrderComponent},
  {path: 'order/:id', component: OrderComponent},
  {path: 'orders', component: ListOrderComponent},
  {path: 'reg', component: CreateUserComponent},
  {path: 'usere/:id', component: UserComponent},
  {path: 'ordering', component: OrderingComponent},
  {path: 'regedit', component: RegeditComponent},
  {path: 'useredit/:id', component: UserEditComponent},

];

import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule, HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppService} from './app.service';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {CreateOrderComponent} from './create-order/create-order.component';
import {OrderComponent} from './order/order.component';
import {ListOrderComponent} from './list-order/list-order.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {UserComponent} from './user/user.component';
import {OrderingComponent} from './ordering/ordering.component';
import {PhoneMaskDirective} from './create-user/phone-mask.directive';
import { RegeditComponent } from './regedit/regedit.component';
import { UserEditComponent } from './user-edit/user-edit.component';


@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'X-XSRF-TOKEN';
    const token = this.tokenExtractor.getToken() as string;
    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({headers: req.headers.set(headerName, token)});
    }
    return next.handle(req);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeadComponent,
    LoginComponent,
    CreateOrderComponent,
    OrderComponent,
    ListOrderComponent,
    CreateUserComponent,
    UserComponent,
    OrderingComponent,
    PhoneMaskDirective,
    RegeditComponent,
    UserEditComponent
  ], exports: [
    PhoneMaskDirective
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie', // this is optional
      headerName: 'My-Xsrf-Header' // this is optional
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AppService, {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true}, HttpClientModule, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
