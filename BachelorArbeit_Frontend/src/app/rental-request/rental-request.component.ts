import { Component, OnInit } from '@angular/core';
import {RentalRequest} from "../model/rentalRequest";
import {RentalRequestService} from "../service/rental-request.service";
import {UserService} from "../service/user.service";
import {Observable} from "rxjs";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {SharedService} from "../SharedService";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../model/user";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-rental-request',
  templateUrl: './rental-request.component.html',
  styleUrls: ['./rental-request.component.css']
})
export class RentalRequestComponent implements OnInit {
  rentalRequests: RentalRequest[] = [];
  noRentalRequests: boolean;
  dateForAppointment: Date;
  scheduleAppointment!: FormGroup;
  // idUser: any;
  // currentUser = {} as User;

  constructor(private rentalRequestService: RentalRequestService,private router: Router,
              private userService: UserService, private messageService: MessageService,
              private sharedService: SharedService, private modalService: NgbModal) { }

  async ngOnInit(): Promise<void> {
    // this.idUser = localStorage.getItem("idUser");
    // this.userService.getUserById(this.idUser).subscribe(res => {
    //   this.currentUser = res.data
    // })
    // console.log("proprietar")
    // console.log(Number(localStorage.getItem("idUser")))
    // console.log(this.currentUser.firstName)
    await this.getNonevaluatedRentalRequestsForLandlord(Number(localStorage.getItem('idUser')))
    console.log(this.rentalRequests)
    for (let request of this.rentalRequests) {
      await this.userService.getUserById(request.idTenant).subscribe(response => {
        request.nameRequester = response.data.firstName + " " + response.data.lastName;
      });
    }

    if (this.rentalRequests.length==0)
      this.noRentalRequests = true

    this.sharedService.justProfilePage = false;

    this.scheduleAppointment = new FormGroup({
      date: new FormControl()
    })
  }

  async getNonevaluatedRentalRequestsForLandlord(idLandlord: number) {
    await this.rentalRequestService.getNonevaluatedRentalRequestsForLandlord(idLandlord).toPromise().then((response) => {
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


  async sendEvaluationResult(landlordId: number, tenantId: number, idRequest: number, appointmentDate: Date) {
    // console.log(idLandlord)
    // console.log(idTenant)
    this.dateForAppointment = this.scheduleAppointment.controls['date'].value;
    this.rentalRequestService.setAppointmentDate(idRequest, this.dateForAppointment).subscribe(res =>{})

    await this.userService.evaluateTenantRequest(landlordId, tenantId, idRequest, appointmentDate).toPromise().then((response):any => {
      if (response.success)
        console.log("succesfully added tenant to landlord")
    })
    // await this.rentalRequestService.removeRentalrequest(propertyId).then(response => {
    //   console.log("succesfully removed rental request")
    // })
    // await this.getRentalRequestsForLandlord(Number(localStorage.getItem('idUser')))
    // console.log(this.rentalRequests)

    this.messageService.add({severity: 'info', summary: 'New tenant added', detail: ''});
    // this.rentalRequestService.getNonevaluatedRentalRequestsForLandlord(Number(localStorage.getItem('idUser'))).toPromise().then(res =>{
    //   this.rentalRequests = res.data;
    // })
    // await this.router.navigate(['rental-request'])
  }

  async declineRequest(idLandlord: number, idTenant: number, propertyId: number) {
    await this.rentalRequestService.removeRentalrequest(propertyId).then(response => {
      console.log("succesfully removed rental request")
    })
  }

  displayResponsive: boolean;
  showResponsiveDialog() {
    this.displayResponsive = true;
  }


}
