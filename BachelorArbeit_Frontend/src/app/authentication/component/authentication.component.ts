import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Button} from "primeng/button";
import {colors} from "@angular/cli/utilities/color";
import {Toast} from "primeng/toast";
import {HttpParams} from "@angular/common/http";
import {User} from "../../model/user";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [MessageService]
})
export class AuthenticationComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  role: string = "";
  users!: User[];
  loginButton = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router, private messageService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.logout();
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    });

    this.loginForm = this.formBuilder.group({
      emailLogin: [''],
      passwordLogin: ['']
    });


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

  login() {

    this.userService.login(this.loginForm.controls['emailLogin'].value, this.loginForm.controls['passwordLogin'].value).subscribe(response => {
      if (response.success) {
        localStorage.setItem('idUser', response.data.userId);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('email', this.loginForm.controls['emailLogin'].value);
        localStorage.setItem('passwordLogin', this.loginForm.controls['passwordLogin'].value);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('phoneNumber', response.data.mobileNumber);
        localStorage.setItem('birthDay', response.data.birthDay);
        localStorage.setItem('role', response.data.role);
        console.log(response.data);
        this.authService.login(response.data.role)
        this.messageService.add({severity: 'success', summary: 'Login successful', detail: 'null'});
        if (response.data.role == "landlord")
          this.router.navigate(['home-landlord']);
        else if (response.data.role == "tenant")
          this.router.navigate(['home-tenant']);
      } else
          this.messageService.add({severity: 'error', summary: 'Login error', detail: response.message});
    })

    console.log(localStorage)
    return
  }

  async load() {
    await this.userService.getAllUsers().toPromise().then((data) => {
      if (data.success) {
        this.users = data.data;
      }
      console.log(this.users);
    })}

  showLogin() {
    this.loginButton = true;
  }

  logout() {
    // // @ts-ignore
    // localStorage.setItem('email', null);
    // // @ts-ignore
    // localStorage.setItem('fullName', null);
    // // @ts-ignore
    // localStorage.setItem('token', null);

    localStorage.clear();

  }
}
