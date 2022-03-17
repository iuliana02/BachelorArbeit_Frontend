import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./component/home.component";
import {MegaMenuModule} from "primeng/megamenu";

@NgModule({
  declarations: [HomeComponent],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MegaMenuModule
  ]
})
export class HomeModule { }
