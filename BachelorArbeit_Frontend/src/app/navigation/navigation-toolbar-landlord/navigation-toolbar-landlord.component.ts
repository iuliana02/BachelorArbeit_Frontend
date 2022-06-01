import { Component, OnInit } from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-navigation-toolbar-landlord',
  templateUrl: './navigation-toolbar-landlord.component.html',
  styleUrls: ['./navigation-toolbar-landlord.component.css']
})
export class NavigationToolbarLandlordComponent implements OnInit {
  constructor(public router : Router, private userService: UserService) { }

  ngOnInit(): void {

  }


  goToProfile() {
    this.router.navigate(['profile'])
  }

  logout() {
    // @ts-ignore
    // localStorage.setItem('username', null);
    // @ts-ignore
    // localStorage.setItem('email', null);
    // // @ts-ignore
    // localStorage.setItem('fullName', null);
    // // @ts-ignore
    // localStorage.setItem('token', null);
    this.userService.logout(String(localStorage.getItem("emailLogin")))
    localStorage.clear()
    this.router.navigate(['first-page'])
  }

  goToHome() {
    this.router.navigate(['home-landlord'])
  }

  addNewProperty() {
    this.router.navigate(['add-property'])
  }
}
