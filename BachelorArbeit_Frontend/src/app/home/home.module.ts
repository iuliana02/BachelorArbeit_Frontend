import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./component/home.component";
import {MegaMenuModule} from "primeng/megamenu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [HomeComponent],
  exports: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        MegaMenuModule,
        MatProgressSpinnerModule
    ]
})
export class HomeModule { }
