import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MegaMenuItem, MessageService} from "primeng/api";
import {PropertyService} from "../../service/property.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {BackendService} from "../../backend/backend.service";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Property} from "../../model/property";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RentalRequest} from "../../model/rentalRequest";


@Component({
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit {
  idUser: any;
  apartments: Property[] = [];
  likedApartments: Property[] = [];
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;
  closeResults: any;
  rentalRequest: FormGroup;

  @Input() selected: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(public propertyService: PropertyService,
              private modalService: NgbModal,
              private messageService: MessageService,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem("idUser");
    this.propertyService.getAllProperties().subscribe(response =>
    {
      if(response.success) {
        this.apartments = response.data;
        console.log(this.apartments)
      }
    })
    this.propertyService.getLikedApartments(this.idUser).subscribe(response =>
    {
      if(response.success)
        this.likedApartments = response.data;
      console.log("Liked Apartments: " + this.likedApartments)
    })

    this.rentalRequest = new FormGroup({
      question1: new FormControl(),
      question2: new FormControl(),
      question3: new FormControl(),
    })
  }

  imageToShow: any;

  async getImage(idProperty: number) {
    this.propertyService.getImage(idProperty).then(res => {
        this.retrieveResonse = res;
        console.log(this.retrieveResonse.data)
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        this.imageToShow = this.retrievedImage;
      }
    );
  }


  likeAp: any = false;
  likeApartment(idProperty:any) {
    let idUser : any;
    idUser = localStorage.getItem('idUser')
    console.log(idUser)
    console.log(idProperty)
    this.propertyService.likeApartment(idUser, idProperty).subscribe(response =>
    {
      if(response.success) {
        for (let i = 0; i<this.apartments.length; i++)
          if (this.apartments[i].idProperty == idProperty)
            this.apartments[i].liked = true;
        // this.likeAp = true;
        console.log(this.likeAp)
        this.messageService.add({severity: 'info', summary: 'Liked', detail: 'Saved to your favourites!'});
      }
    });
    for (let i = 0; i<this.apartments.length; i++)
      console.log("Apartments: " + this.apartments[i].liked)
  }

  dislikeApartment(idProperty:any) {
    let idUser : any;
    idUser = localStorage.getItem('idUser')

    this.propertyService.dislikeApartment(idUser, idProperty).subscribe(response =>
    {
      if(response.success) {
        for (let i = 0; i<this.apartments.length; i++)
          if (this.apartments[i].idProperty == idProperty)
            this.apartments[i].liked = false;
        // this.likeAp = true;
        console.log(this.likeAp)
        this.messageService.add({severity: 'info', summary: 'Removed from liked', detail: 'Removed from your favourites!'});
      }
    });
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


  public toggleSelected(propertyId: number) {
    console.log("All apartments")
    for (let ap1 of this.apartments)
      console.log(ap1)
    console.log("Liked apartments")
    for (let ap2 of this.likedApartments)
      console.log(ap2)
    for (let i = 0; i < this.apartments.length; i++) {
      if (this.apartments[i].idProperty == propertyId) {
        if (!this.checkIfApartmentIsInFavourites(propertyId)) {
          this.apartments[i].liked = true;
          // this.selected = !this.selected
          this.propertyService.likeApartment(this.idUser, propertyId).subscribe(response => {
            if (response.success) {
              this.messageService.add({severity: 'info', summary: 'Liked', detail: 'Saved to your favourites!'});
            }
          });
        }
        if (this.checkIfApartmentIsInFavourites(propertyId)) {
          this.apartments[i].liked = false;
          // this.selected = !this.selected
          console.log("includes")
          this.propertyService.dislikeApartment(this.idUser, propertyId).subscribe(response => {
            if (response.success) {
              this.messageService.add({severity: 'info', summary: 'Removed from liked', detail: 'Removed from your favourites!'});
            }
          });
        }
      }
    return this.selectedChange.emit(this.selected);
    }


    this.propertyService.getLikedApartments(this.idUser).subscribe(response =>
    {
      if(response.success)
        this.likedApartments = response.data;
      console.log("Liked Apartments: " + this.likedApartments)
    })
  }

  public checkIfApartmentIsInFavourites(propertyId: number): boolean {
    this.propertyService.getLikedApartments(this.idUser).subscribe(response => {
        if (response.success) {
          this.likedApartments = response.data;
          console.log("Liked Apartments: " + this.likedApartments)
        }
        for (let ap1 of this.apartments)
          for (let ap of this.likedApartments) {
            if (ap.idProperty == propertyId) {
              ap1.liked = true;
              return true
            }
        }
        return false;
      })
    return false
  }

  public sendRentalRequest(apartment: Property) {
    console.log(localStorage)
    let rentalRequest = {} as RentalRequest;
    rentalRequest.question1 = this.rentalRequest.controls['question1'].value;
    rentalRequest.question2 = this.rentalRequest.controls['question2'].value;
    rentalRequest.question3 = this.rentalRequest.controls['question3'].value;
    this.propertyService.sendRentalRequest(rentalRequest, Number(apartment.idUser), Number(localStorage.getItem("idUser")), apartment.idProperty).subscribe(response => {
        if (response.success) {
          console.log("property success")
          this.messageService.add({severity: 'success', summary: 'Succesfully sent rental request', detail: "null"})
        }
      }
    );
  }
}
