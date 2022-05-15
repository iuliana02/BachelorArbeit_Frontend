import { Component, OnInit } from '@angular/core';
import {RentalRequest} from "../model/rentalRequest";
import {RentalRequestService} from "../service/rental-request.service";
import {UserService} from "../service/user.service";
import {Observable} from "rxjs";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-rental-request',
  templateUrl: './rental-request.component.html',
  styleUrls: ['./rental-request.component.css']
})
export class RentalRequestComponent implements OnInit {
  rentalRequests: RentalRequest[] = [];

  constructor(private rentalRequestService: RentalRequestService,
              private userService: UserService, private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    await this.getRentalRequestsForLandlord(Number(localStorage.getItem('idUser')))
    console.log(this.rentalRequests)
    for (let request of this.rentalRequests) {
      await this.userService.getUserById(request.idTenant).subscribe(response => {
        request.nameRequester = response.data.firstName + " " + response.data.lastName;
      });
    }
  }

  async getRentalRequestsForLandlord(idLandlord: number) {
    await this.rentalRequestService.getRentalRequestsForLandlord(idLandlord).toPromise().then((response) => {
      this.rentalRequests = response.data;
    })
  }

  async getUsernameById (idUser : number):Promise<string> {
    let username: string = ""
     await this.userService.getUserById(idUser).subscribe(response => {
        username = response.data.firstName + " " + response.data.lastName;
        console.log(username)
      });
    return username;
  }


  approveRequest(idLandlord: number, idTenant: number, propertyId: number) {
    console.log(idLandlord)
    console.log(idTenant)
    this.userService.addTenantToLandlord(idLandlord, idTenant).subscribe(response =>{
      if(response.success)
        console.log("succesfully added tenant to landlord")
    })
    this.rentalRequestService.removeRentalrequest(propertyId).subscribe(response =>{
        console.log("succesfully removed rental request")
    })

    this.messageService.add({severity: 'info', summary: 'New tenant added', detail: ''});

  }
}
