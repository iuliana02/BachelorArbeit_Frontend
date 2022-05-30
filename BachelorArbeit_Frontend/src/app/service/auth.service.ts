import { Injectable } from '@angular/core';
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false;

  roleAs!: string;

  constructor(private router: Router) { }

  // login(value: string) {
  //   this.isLogin = true;
  //   this.roleAs = value;
  //   localStorage.setItem('STATE', 'true');
  //   localStorage.setItem('ROLE', this.roleAs);
  //   return of({ success: this.isLogin, role: this.roleAs });
  // }

  // logout() {
  //   this.isLogin = false;
  //   this.roleAs = '';
  //   localStorage.setItem('STATE', 'false');
  //   localStorage.setItem('ROLE', '');
  //   return of({ success: this.isLogin, role: '' });
  // }

  logout() {
    localStorage.setItem("email", 'null');
    localStorage.setItem("token", 'null');
    localStorage.setItem("firstName", 'null');
    localStorage.setItem("lastName", 'null');
  }

  isLoggedIn() {
    if ((localStorage.getItem('emailLogin') !== 'null' && localStorage.getItem('token') !== 'null'
        && localStorage.getItem('firstName') !== 'null' && localStorage.getItem('lastName') !== 'null') &&
      (localStorage.getItem('emailLogin') !== null && localStorage.getItem('token') !== null
        && localStorage.getItem('firstName') !== null && localStorage.getItem('lastName') !== null)) {
      return true;
    } else
      return false;
  }

  getRole() {
    // @ts-ignore
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }
}
