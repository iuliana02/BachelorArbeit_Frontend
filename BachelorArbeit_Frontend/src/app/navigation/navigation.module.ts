import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {NavigationToolbarLandlordComponent} from "./navigation-toolbar-landlord/navigation-toolbar-landlord.component";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {MegaMenuModule} from "primeng/megamenu";
import {DividerModule} from "primeng/divider";
import { NavigationToolbarTenantComponent } from './navigation-toolbar-tenant/navigation-toolbar-tenant.component';

@NgModule({
  declarations: [NavigationToolbarLandlordComponent, NavigationToolbarTenantComponent],
    exports: [
        NavigationToolbarLandlordComponent,
        NavigationToolbarTenantComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    ButtonModule,
    MenuModule,
    MegaMenuModule,
    DividerModule
  ]
})
export class NavigationModule { }
