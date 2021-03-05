import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isAdmin = false;

  constructor(public app: AppService) {
  }

  ngOnInit(): void {
  }

  authenticated() {
    return this.app.authenticated;
  }


}
