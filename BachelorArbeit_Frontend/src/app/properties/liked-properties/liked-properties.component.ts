import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PropertyService} from "../../service/property.service";

@Component({
  selector: 'app-liked-properties',
  templateUrl: './liked-properties.component.html',
  styleUrls: ['./liked-properties.component.css']
})
export class LikedPropertiesComponent implements OnInit {
  apartments: any[] = [];

  constructor(public propertyService: PropertyService, private modalService: NgbModal) { }

  ngOnInit(): void {
    let idUser :any;
    idUser = localStorage.getItem("idUser")
    this.propertyService.getLikedApartments(idUser).subscribe(response =>
    {
      if(response.success)
        this.apartments = response.data;
      console.log(this.apartments)
    })
  }

  closeResult: any;
  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
