import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {notification} from "../../model/notification";
import {NotificationService} from "../../service/notification.service";
import {MenuItem} from "primeng/api";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import * as $ from "jquery";
import format from "@popperjs/core/lib/utils/format";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-navigation-toolbar-tenant',
  templateUrl: './navigation-toolbar-tenant.component.html',
  styleUrls: ['./navigation-toolbar-tenant.component.css']
})
export class NavigationToolbarTenantComponent implements OnInit {
  notifications: notification[] = []
  idUser: any;
  notificationsFromResponse: any[];
  showNotifications: boolean = false;
  constructor(private router : Router, private  notificationService: NotificationService) { }

  async ngOnInit() {
    this.idUser = localStorage.getItem("idUser")
    console.log(this.idUser)
    await this.notificationService.getNotificationsForUser().toPromise().then((resp: any) =>
    {
      if (resp.success) {
        this.notificationsFromResponse = resp.data;
      }
    })
    console.log(this.notificationsFromResponse.length)
    console.log(this.notificationsFromResponse[0].type)
    for (let n of this.notificationsFromResponse) {
      var s: string = "";
      let notif: any;
      if (n.type == "WELCOME_NEW_USER") {
        s = "Welcome to Estatesy, " + n.message.data.firstName + " " + n.message.data.lastName + "!"
        notif = {type: n.type, object: n.message, date: formatDate(n.date, 'dd-MM-yyyy', 'en-US'), message: s}
      }
      else if (n.type == "ACCEPTED_REQUEST"){
        notif = {type: n.type, object: n.message, date: formatDate(n.date, 'dd-MM-yyyy', 'en-US'), message: n.message}
      }
      this.notifications.push(notif)
    }
    // if (this.notificationsFromResponse.length==0)
    //   this.notifications = ['No new notifications']
  }



  goToProfile() {
    this.router.navigate(['profile'])
  }

  goToHome() {
    this.router.navigate(['home-tenant'])
  }

  logout() {
    // @ts-ignore
    // localStorage.setItem('username', null);
    // @ts-ignore
    localStorage.setItem('email', null);
    // @ts-ignore
    localStorage.setItem('fullName', null);
    // @ts-ignore
    localStorage.setItem('token', null);

    this.router.navigate(['first-page'])
  }

  goToNotifications() {
    this.showNotifications = true;
  }

  displayNotifications() {
    $(".dropdown").toggleClass("active");
  }
}
