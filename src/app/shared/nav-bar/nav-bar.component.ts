import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/service.index';
import { Result } from '../../models/result.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  email = '';
  constructor(public route: Router, private commonS: CommonService) { }

  ngOnInit(): void {
    const dataUser = JSON.parse(localStorage.getItem('user_tw1'));
    this.email = dataUser.email;
  }

  logout(){
    localStorage.removeItem('Authorization');
    localStorage.removeItem('user_tw1');
    this.route.navigateByUrl('/login');
  }

}
