import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-first-page-navigation',
  templateUrl: './first-page-navigation.component.html',
  styleUrls: ['./first-page-navigation.component.css']
})
export class FirstPageNavigationComponent implements OnInit {
  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'eState', url: 'first-page'},
      {label: 'Landlords', icon: 'pi pi-fw pi-calendar', disabled:true},
      {label: 'Tenants', icon: 'pi pi-fw pi-pencil', disabled:true},
      {label: 'Login', icon: 'pi pi-fw pi-cog', url: 'login'},
      {label: 'Signup', icon: 'pi pi-fw pi-cog', url: 'signup'}
    ];
  }

}
