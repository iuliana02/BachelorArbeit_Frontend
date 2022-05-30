import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {PropertyService} from "../service/property.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.css']
})
export class TenantsListComponent implements OnInit {
  tenantsApartmentsList : any[][] = []
  retrieveResponse: any;
  retrievedImage: any;
  base64Data: any;
  imageIdList : any[] = [];

  constructor(private userService: UserService, private propertyService: PropertyService, private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    await this.userService.getAcceptedTenantsForLandlord(Number(localStorage.getItem('idUser'))).toPromise().then((res):any => {
      this.tenantsApartmentsList = res.data;
    })
    for (let apart of this.tenantsApartmentsList) {
      apart[1]['correspondingApartment'].imagesToShow = await this.getImages(apart[1]['correspondingApartment'].idProperty)
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
