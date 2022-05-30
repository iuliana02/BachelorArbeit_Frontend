import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../service/user.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginButton = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private messageService: MessageService, private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailLogin: [''],
      passwordLogin: ['']
    });
  }

  showLogin() {
    this.loginButton = true;
  }

  login() {
    this.userService.login(this.loginForm.controls['emailLogin'].value, this.loginForm.controls['passwordLogin'].value).subscribe(response => {
      if (response.success) {
        localStorage.setItem('idUser', response.data.userId);
        localStorage.setItem('firstName', response.data.firstName);
        localStorage.setItem('lastName', response.data.lastName);
        localStorage.setItem('emailLogin', this.loginForm.controls['emailLogin'].value);
        localStorage.setItem('passwordLogin', this.loginForm.controls['passwordLogin'].value);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('phoneNumber', response.data.mobileNumber);
        localStorage.setItem('birthDay', response.data.birthDay);
        localStorage.setItem('role', response.data.role);
        console.log(response.data);
        console.log(localStorage)

        // this.authService.login(response.data.role)
        console.log(localStorage.getItem("emailLogin"));
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
}
