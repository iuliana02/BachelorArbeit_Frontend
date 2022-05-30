import { Component, OnInit } from '@angular/core';
import {Property} from "../../model/property";
import {PropertyService} from "../../service/property.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";

@Component({
  selector: 'app-properties-list-landlord',
  templateUrl: './properties-list-landlord.component.html',
  styleUrls: ['./properties-list-landlord.component.css']
})
export class PropertiesListLandlordComponent implements OnInit {
  apartments: Property[] = [];
  retrieveResponse: any;
  retrievedImage: any;
  base64Data: any;
  imageIdList : any[] = [];


  constructor(public propertyService: PropertyService, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    await this.propertyService.getAllProperties().toPromise().then(response => {
      if (response.success) {
        this.apartments = response.data;
        console.log(this.apartments)
      }
    })

    for (let apart of this.apartments) {
      apart.imagesToShow = await this.getImages(apart.idProperty)
    }
  }

  responsiveOptions:any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

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
