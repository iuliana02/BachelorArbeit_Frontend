import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AuthenticationComponent} from "./component/authentication.component";

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    MessageService
  ]
})
export class AuthenticationModule { }
