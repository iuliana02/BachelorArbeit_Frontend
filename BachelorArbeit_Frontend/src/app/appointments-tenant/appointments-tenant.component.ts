import { Component, OnInit } from '@angular/core';
import {PropertyService} from "../service/property.service";
import {DomSanitizer} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
import {UserService} from "../service/user.service";
import {map} from "rxjs/operators";
import {Subject, takeUntil} from "rxjs";
import {BackendWsService} from "../backend/backend-ws.service";

@Component({
  selector: 'app-appointments-tenant',
  templateUrl: './appointments-tenant.component.html',
  styleUrls: ['./appointments-tenant.component.css']
})
export class AppointmentsTenantComponent implements OnInit {
  tenantsApartmentsList : any[] = []
  retrieveResponse: any;
  retrievedImage: any;
  base64Data: any;
  imageIdList : any[] = [];
  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(private propertyService: PropertyService, private sanitizer: DomSanitizer,
              private userService: UserService, private backendWsService: BackendWsService) { }

  async ngOnInit(): Promise<void> {
    // await this.userService.getEvaluatedRequestsForTenant(Number(localStorage.getItem('idUser'))).toPromise().then((res):any => {
    //   this.tenantsApartmentsList = res.data;
    //   console.log(this.tenantsApartmentsList)
    // })

    // @ts-ignore
    this.backendWsService
      .getEvaluatedRequestsForTenant(Number(localStorage.getItem('idUser')))
      .pipe(map(tenantsApartmentsList => this.setImagesAndFormattedDate(tenantsApartmentsList)), takeUntil(this.unsubscribeSubject))
      .subscribe( async tenantsApartmentsList => this.tenantsApartmentsList = await tenantsApartmentsList)
    this.backendWsService
      .onEvaluatedRequest()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(req => {
        this.tenantsApartmentsList.push(req)
        this.setImagesAndFormattedDate(this.tenantsApartmentsList);
      });
    console.log(this.tenantsApartmentsList)


  }

  async setImagesAndFormattedDate(appointments: any) {
    for (let apart of appointments) {
      apart[1]['correspondingApartment'].imagesToShow = await this.getImages(apart[1]['correspondingApartment'].idProperty)
      const datepipe: DatePipe = new DatePipe('en-US')
      let formattedDate = datepipe.transform(apart[2]["appointmentDate"], 'YYYY-MM-dd HH:mm:ss')
      console.log("formattedDate")
      console.log(formattedDate)
      apart[2]["appointmentDate"] = formattedDate
    }
    return appointments
  }

  async getImages(idProperty: number): Promise<any[]> {
    await this.propertyService.getPhotoIds(idProperty).toPromise().then((res) => {
      this.imageIdList = res.data
    })
    console.log("idList" + this.imageIdList)
    let imagesToShow : any[] = []
    for (let imgId of this.imageIdList) {
      this.propertyService.getImage(imgId).subscribe((res: any) => {
          this.retrieveResponse = res.picByte;
          // console.log(this.retrieveResponse)
          this.retrievedImage = 'data:image/jpeg;base64,' + this.retrieveResponse;
          imagesToShow.push(this.sanitizer.bypassSecurityTrustUrl(this.retrievedImage));
        }
      );
    }
    return imagesToShow;
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }
}
