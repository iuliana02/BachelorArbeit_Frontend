import { Component, OnInit } from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {RentalRequestService} from "../../service/rental-request.service";
import {User} from "../../model/user";
import {BackendWsService} from "../../backend/backend-ws.service";
import {map} from "rxjs/operators";
import {Subject, takeUntil} from "rxjs";
import {RentalRequest} from "../../model/rentalRequest";

@Component({
  selector: 'app-navigation-toolbar-landlord',
  templateUrl: './navigation-toolbar-landlord.component.html',
  styleUrls: ['./navigation-toolbar-landlord.component.css']
})
export class NavigationToolbarLandlordComponent implements OnInit {
  rentalRequests: RentalRequest[] = [];
  notifications: number;
  user: any = {} as User;
  users!: User[];
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(public router : Router, private userService: UserService,
              private rentalRequestService: RentalRequestService, private backendWsService: BackendWsService) { }
  async ngOnInit() {
    await this.userService.getAllUsers().toPromise().then((data) =>{
      if (data.success){
        this.users = data.data;
        console.log(this.users)
      }
    })
    this.user = this.users.find((x) => x.username === localStorage.getItem("emailLogin"));

    this.backendWsService
      .getNonevaluatedRequests(Number(localStorage.getItem('idUser')))
      .pipe(map(requests => requests), takeUntil(this.unsubscribeSubject))
      .subscribe(rentalRequests => this.rentalRequests = rentalRequests)
    this.backendWsService
      .onRentalRequest()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(req => {
        this.rentalRequests.push(req);
      });

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

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }
}
