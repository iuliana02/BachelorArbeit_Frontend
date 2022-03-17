import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../authentication/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  items!: MenuItem[];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {label: 'ESTATESY', disabled:true},
      {label: 'Landlords', icon: 'pi pi-fw pi-calendar',
        items: [
          {label: 'Rental listings', disabled: true},
          {label: 'Find tenants', disabled: true},
          {label: 'Monitorize your properties', disabled: true},
        ]},
      {label: 'Tenants', icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Find the perfect rent', disabled: true},
          {label: 'Keep in touch with your landlord', disabled: true},
          {label: 'Pay your rent', disabled: true},
        ]},
      {label: 'Login', icon: 'pi pi-fw pi-cog', url: 'login'}
    ];
  }



}
