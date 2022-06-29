import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MegaMenuItem, MenuItem} from "primeng/api";
import { DatePipe } from '@angular/common';
import {PropertyService} from "../../service/property.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Property} from "../../model/property";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  verticalMenu!: MegaMenuItem[];
  currentDate: Date = new Date();
  formatCurrentDate: string | null;
  mostLikedApartment: Property;
  retrieveResponse: any;
  retrievedImage: any;
  base64Data: any;
  imageIdList : any[] = [];
  noApartments: boolean = false;

  constructor(public router: Router, private propertyService: PropertyService, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    console.log(localStorage)
    if (localStorage.getItem('email') == 'null') {
      this.logout();
      return;
    }

    this.verticalMenu = [
      {
        label: 'Dashboard',
        url: 'home-landlord',
      },
      {
        label: 'Profile',
        url: 'profile'
      },
      {
        label: 'My properties',
        url: 'properties-list-landlord'
      },
      {
        label: 'Tenant requests',
        url: 'rental-request'
      },
      {
        label: 'Appointments',
        url: 'tenants-list'
      }
    ]
    const datepipe: DatePipe = new DatePipe('en-US')
    this.formatCurrentDate = datepipe.transform(this.currentDate, 'dd-MMM-YYYY')

    await this.propertyService.getPropertyWithMostLikes().toPromise().then(res => {
      this.mostLikedApartment = res.data;
    })
    if (this.mostLikedApartment == null){
      this.noApartments = true;
    }


    this.mostLikedApartment.imagesToShow = await this.getImages(this.mostLikedApartment.idProperty)

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

    this.router.navigate(['login'])
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
