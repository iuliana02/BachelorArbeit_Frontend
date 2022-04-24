import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MegaMenuItem, MenuItem} from "primeng/api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  verticalMenu!: MegaMenuItem[];

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log(localStorage)
    if (localStorage.getItem('email') == 'null') {
      this.logout();
      return;
    }

    this.verticalMenu = [
      {
        label: 'Dashboard',
        url:'home-landlord'
      },
      {
        label: 'Profile',
        url:'profile'
      },
      {
        label: 'My properties',
          url: 'properties-list-landlord'
        // items:[]
          // {label: 'Rented apartments', url: 'properties-list'} as MenuItem,
          // {label: "Not rented apartments", url: 'properties-list'}] as MenuItem
      },
      {
        label: 'My tenants',
        url: 'tenants-list'
      },
      {
        label: 'Tenant requests',
        url: 'rental-request'
      }
    ]
  }

  logout() {
    // @ts-ignore
    // localStorage.setItem('username', null);
    // @ts-ignore
    localStorage.setItem('email', null);
    // @ts-ignore
    localStorage.setItem('fullName', null);
    // @ts-ignore
    localStorage.setItem('token', null);

    this.router.navigate(['login'])
  }

}
