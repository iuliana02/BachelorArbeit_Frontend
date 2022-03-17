import { Component, OnInit } from '@angular/core';
import {MegaMenuItem} from "primeng/api";

@Component({
  selector: 'app-home-tenant',
  templateUrl: './home-tenant.component.html',
  styleUrls: ['./home-tenant.component.css']
})
export class HomeTenantComponent implements OnInit {
  verticalMenu!: MegaMenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.verticalMenu = [
      {
        label: 'Dashboard',
        url:'home-tenant'
      },
      {
        label: 'Profile',
        url:'profile'
      },
      {
        label: 'All apartments',
        url: 'properties-list'
      },
      {
        label: 'Liked apartments',
        url: 'liked-properties'
      }
      ]
  }



}
