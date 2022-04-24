import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-toolbar-tenant',
  templateUrl: './navigation-toolbar-tenant.component.html',
  styleUrls: ['./navigation-toolbar-tenant.component.css']
})
export class NavigationToolbarTenantComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToProfile() {
    this.router.navigate(['profile'])
  }

  goToHome() {
    this.router.navigate(['home-tenant'])
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

    this.router.navigate(['first-page'])
  }

}
