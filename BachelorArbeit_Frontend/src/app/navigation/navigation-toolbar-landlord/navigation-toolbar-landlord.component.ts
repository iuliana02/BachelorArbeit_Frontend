import { Component, OnInit } from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {RentalRequestService} from "../../service/rental-request.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-navigation-toolbar-landlord',
  templateUrl: './navigation-toolbar-landlord.component.html',
  styleUrls: ['./navigation-toolbar-landlord.component.css']
})
export class NavigationToolbarLandlordComponent implements OnInit {
  notifications: number;
  user: any = {} as User;
  users!: User[];

  constructor(public router : Router, private userService: UserService,
              private rentalRequestService: RentalRequestService) { }
  async ngOnInit() {
    await this.userService.getAllUsers().toPromise().then((data) =>{
      if (data.success){
        this.users = data.data;
        console.log(this.users)
      }
    })
    this.user = this.users.find((x) => x.username === localStorage.getItem("emailLogin"));

    this.rentalRequestService.getNonevaluatedRentalRequestsForLandlord(this.user.userId).subscribe(response => {
        this.notifications = response.data.length;
        console.log(response)
      }
    )
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
    console.log(String(localStorage.getItem("emailLogin")))
    this.userService.logout(String(localStorage.getItem("emailLogin"))).subscribe()
    localStorage.clear()
    this.router.navigate(['first-page'])
  }

  goToHome() {
    this.router.navigate(['home-landlord'])
  }

  addNewProperty() {
    this.router.navigate(['add-property'])
  }

  goToRentalRequests() {
    this.router.navigate(['rental-request'])
  }
}
