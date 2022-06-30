import {Component, Input, OnInit} from '@angular/core';
import {RentalRequest} from "../model/rentalRequest";
import {RentalRequestService} from "../service/rental-request.service";
import {UserService} from "../service/user.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {SharedService} from "../SharedService";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../model/user";
import {FormControl, FormGroup} from "@angular/forms";
import {BackendWsService} from "../backend/backend-ws.service";
import {first, map} from "rxjs/operators";


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
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(private rentalRequestService: RentalRequestService,private router: Router,
              private userService: UserService, private messageService: MessageService,
              private sharedService: SharedService, private modalService: NgbModal,
              private backendWsService: BackendWsService) { }

  async ngOnInit(): Promise<void> {
    this.sharedService.rentalRequestsPage = true;

    this.backendWsService
      .getNonevaluatedRequests(Number(localStorage.getItem('idUser')))
      .pipe(map(requests => this.addTenantNames(requests)), takeUntil(this.unsubscribeSubject))
      .subscribe(async rentalRequests => this.rentalRequests = await rentalRequests)
    this.backendWsService
      .onRentalRequest()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(req => {
        this.rentalRequests.push(req);
        this.addTenantNames(this.rentalRequests)
      });

    // await this.getNonevaluatedRentalRequestsForLandlord(Number(localStorage.getItem('idUser')))
    // for (let request of this.rentalRequests) {
    //   await this.userService.getUserById(request.idTenant).subscribe(response => {
    //     request.nameRequester = response.data.firstName + " " + response.data.lastName;
    //   });
    // }

    console.log("this.rentalRequests")
    console.log(this.rentalRequests)

    if (this.rentalRequests.length==0)
      this.noRentalRequests = true

    this.sharedService.justProfilePage = false;

    this.scheduleAppointment = new FormGroup({
      date: new FormControl()
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
    this.dateForAppointment = this.scheduleAppointment.controls['date'].value;
    this.backendWsService.evaluateRequest(landlordId, tenantId, idRequest, appointmentDate)
    this.messageService.add({severity: 'info', summary: 'Rental request successfully evaluated!', detail: ''});
    await this.rentalRequestService.getNonevaluatedRentalRequestsForLandlord(landlordId).toPromise().then((response) => {
      this.rentalRequests = response.data;
      console.log("rentalRequests")
      console.log(this.rentalRequests)
    })
    await this.router.navigate(['rental-request'])
  }

  // async declineRequest(idLandlord: number, idTenant: number, propertyId: number) {
  //   await this.rentalRequestService.removeRentalrequest(propertyId).then(response => {
  //     console.log("succesfully removed rental request")
  //   })
  // }

  displayResponsive: boolean;
  showResponsiveDialog() {
    this.displayResponsive = true;
  }

  async addTenantNames(requests: RentalRequest[]) {
    for (let request of requests) {
      await this.userService.getUserById(request.idTenant).subscribe(response => {
        request.nameRequester = response.data.firstName + " " + response.data.lastName;
      });
    }
    return requests;
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
    this.sharedService.rentalRequestsPage = false;
  }
}
