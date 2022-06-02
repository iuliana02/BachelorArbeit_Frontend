import { Component, OnInit } from '@angular/core';
import {PropertyService} from "../service/property.service";
import {DomSanitizer} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-appointments-tenant',
  templateUrl: './appointments-tenant.component.html',
  styleUrls: ['./appointments-tenant.component.css']
})
export class AppointmentsTenantComponent implements OnInit {
  tenantsApartmentsList : any[][] = []
  retrieveResponse: any;
  retrievedImage: any;
  base64Data: any;
  imageIdList : any[] = [];
  constructor(private propertyService: PropertyService, private sanitizer: DomSanitizer,
              private userService: UserService) { }

  async ngOnInit() {
    await this.userService.getEvaluatedRequestsForTenant(Number(localStorage.getItem('idUser'))).toPromise().then((res):any => {
      this.tenantsApartmentsList = res.data;
      console.log(this.tenantsApartmentsList)
    })
    for (let apart of this.tenantsApartmentsList) {
      apart[1]['correspondingApartment'].imagesToShow = await this.getImages(apart[1]['correspondingApartment'].idProperty)
      const datepipe: DatePipe = new DatePipe('en-US')
      let formattedDate = datepipe.transform(apart[2]["appointmentDate"], 'YYYY-MM-dd HH:mm:ss')
      apart[2]["appointmentDate"] = formattedDate
    }
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
}
