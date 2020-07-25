import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  fillerNav = ['Prueba Prueba Prueba ', 'Prueba 01', 'Prueba 02'];
  navs = [
    {
      title: 'Cuenta',
      url: '/home',
      icon: 'account_balance'
    },
    {
      title: 'Pagos',
      url: '/payments',
      icon: 'payment'
    },
    {
      title: 'Transferencias',
      url: '/transfers',
      icon: 'sync'
    },
    {
      title: 'Reporte',
      url: '/report',
      icon: 'trending_up'
    },
    {
      title: 'Soporte',
      url: '/support',
      icon: 'support_agent'
    },
    {
      title: 'Opciones',
      url: '/options',
      icon: 'settings'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
