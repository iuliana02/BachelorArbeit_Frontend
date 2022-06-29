import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./component/home.component";
import {MegaMenuModule} from "primeng/megamenu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AppModule} from "../app.module";
import {PropertiesListComponent} from "../properties/properties-list_tenants/properties-list.component";
import {
  PropertiesListLandlordComponent
} from "../properties/properties-list-landlord/properties-list-landlord.component";
import {MatIconModule} from "@angular/material/icon";
import {TagModule} from "primeng/tag";
import {ImageModule} from "primeng/image";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [HomeComponent],
  exports: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        MegaMenuModule,
        MatProgressSpinnerModule,
        AppModule,
        MatIconModule,
        TagModule,
        ImageModule,
        FlexModule
    ]
})
export class HomeModule { }
