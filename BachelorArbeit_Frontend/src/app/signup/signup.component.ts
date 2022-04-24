import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {MessageService} from "primeng/api";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  role: string = "";
  users!: User[];

  constructor(private userService: UserService, private formBuilder: FormBuilder,
              private messageService: MessageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.logout();
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    });
  }

  async load() {
    await this.userService.getAllUsers().toPromise().then((data) => {
      if (data.success) {
        this.users = data.data;
      }
      console.log(this.users);
    })}

  toggle1 = false;
  clickLandlord() {
    this.role = "landlord";
    if (!this.toggle2)
      this.toggle1 = !this.toggle1;
  }

  toggle2 = false;
  clickTenant() {
    this.role = "tenant";
    if (!this.toggle1)
      this.toggle2 = !this.toggle2;
  }

  register() {
    this.userService.register(this.registerForm.controls['firstName'].value, this.registerForm.controls['lastName'].value,  this.registerForm.controls['email'].value, this.registerForm.controls['password'].value, this.role).subscribe(response => {
        if (response.success) {
          localStorage.setItem('idUser', response.data.userId);
          localStorage.setItem('firstName', this.registerForm.controls['firstName'].value);
          localStorage.setItem('lastName', this.registerForm.controls['lastName'].value);
          localStorage.setItem('email', this.registerForm.controls['email'].value);
          localStorage.setItem('password', this.registerForm.controls['password'].value);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('phoneNumber', response.data.mobileNumber);
          localStorage.setItem('birthDay', response.data.birthDay);
          localStorage.setItem('role', response.data.role);

          this.messageService.add({severity: 'success', summary: 'Register succesful', detail: 'null'});
        }
      }
      , error => {
        this.messageService.add({severity: 'error', summary: 'Login error', detail: "Is the server on?"});
      }
    )
  }

  logout() {
    this.authService.logout();
  }
}
