import {Component, OnInit} from '@angular/core';
import {SharedService} from "./SharedService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AppFrontend';

  constructor(public sharedService:  SharedService) {
  }

  ngOnInit(): void {
    console.log("ceva")
    console.log(localStorage.getItem('email'))
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('role'))
  }

  isLoggedInAsLandlord(): boolean {
    return localStorage.getItem('email') !== null && localStorage.getItem('token') !== null && localStorage.getItem('role')=="landlord"
  }

  isLoggedInAsTenant(): boolean {
    return localStorage.getItem('email') !== null && localStorage.getItem('token') !== null && localStorage.getItem('role')=="tenant"
  }
}
