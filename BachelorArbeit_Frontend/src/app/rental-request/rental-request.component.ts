import { Component, OnInit } from '@angular/core';
import {RentalRequest} from "../model/rentalRequest";
import {RentalRequestService} from "../service/rental-request.service";
import {UserService} from "../service/user.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-rental-request',
  templateUrl: './rental-request.component.html',
  styleUrls: ['./rental-request.component.css']
})
export class RentalRequestComponent implements OnInit {
  rentalRequests: RentalRequest[] = [];
  username: any;

  constructor(private rentalRequestService: RentalRequestService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getRentalRequestsForLandlord(2)
  }

  getRentalRequestsForLandlord(idLandlord: number) {
    this.rentalRequestService.getRentalRequestsForLandlord(idLandlord).subscribe(response => {
      this.rentalRequests = response.data;
      console.log(this.rentalRequests)
    })
  }

  getUsernameById (idUser : number){
     this.userService.getUserById(idUser).subscribe(response => {
      this.username = response.data;
      // console.log(this.username)
    });
  }

}
