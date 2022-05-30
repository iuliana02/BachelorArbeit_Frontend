import {Component, OnInit} from '@angular/core';
import {SharedService} from "./SharedService";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AppFrontend';

  constructor(public sharedService:  SharedService, public authService: AuthService) {
  }

  ngOnInit(): void {
    console.log("ceva")
    console.log(localStorage.getItem('email'))
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('role'))
  }

  isLoggedInAsLandlord(): boolean {
    return localStorage.getItem('emailLogin') !== null && localStorage.getItem('token') !== null && localStorage.getItem('role')=="landlord"
  }

  isLoggedInAsTenant(): boolean {
    return localStorage.getItem('emailLogin') !== null && localStorage.getItem('token') !== null && localStorage.getItem('role')=="tenant"
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
