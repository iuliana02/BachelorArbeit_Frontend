import {Component, EventEmitter, Input, OnInit, Optional, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PropertyService} from "../../service/property.service";
import {User} from "../../model/user";
import {Property} from "../../model/property";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../service/user.service";
import {RentalRequest} from "../../model/rentalRequest";
import { ChangeDetectorRef } from '@angular/core';
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {BackendWsService} from "../../backend/backend-ws.service";

@Component({
  selector: 'app-liked-properties',
  templateUrl: './liked-properties.component.html',
  styleUrls: ['./liked-properties.component.css']
})
export class LikedPropertiesComponent implements OnInit {
  idUser: any;
  currentUser = {} as User;
  apartments: Property[] = [];
  likedApartments: Property[] = [];
  retrieveResponse: any;
  retrievedImage: any;
  base64Data: any;
  imageIdList: any[] = [];
  message!: string;
  closeResults: any;
  rentalRequest: FormGroup;
  noLikedApartments: boolean;
  // webSocketAPI: WebSocketAPI;


  @Input() selected: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(@Optional() public propertyService: PropertyService, @Optional() private modalService: NgbModal,
              @Optional() private messageService: MessageService, @Optional() private sanitizer: DomSanitizer,
              @Optional() private userService: UserService, @Optional() private router: Router,
              @Optional() private backendWsService: BackendWsService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit(): Promise<void> {
    this.idUser = localStorage.getItem("idUser");
    this.userService.getUserById(this.idUser).subscribe(result => {
      this.currentUser = result.data;
    })

    await this.propertyService.getLikedApartments(this.idUser).toPromise().then(response => {
      if (response.success) {
        this.apartments = response.data;
      }
    });
    if (this.apartments.length==0)
      this.noLikedApartments = true;

    for (let apart of this.apartments) {
      apart.imagesToShow = await this.getImages(apart.idProperty)
    }

    await this.propertyService.getLikedApartments(this.idUser).toPromise().then((response) => {
      if (response.success)
        this.currentUser.likedApartments = response.data;
    })

    for (let apart of this.apartments)
      for (let myApart of this.currentUser.likedApartments)
        if (apart.idProperty == myApart.idProperty)
          apart.liked = true;

    this.rentalRequest = new FormGroup({
      question1: new FormControl(),
      question2: new FormControl(),
      question3: new FormControl(),
    })

    console.log(this.currentUser)

    // this.webSocketAPI = new WebSocketAPI(new LikedPropertiesComponent);

  }

  async getImages(idProperty: number): Promise<any[]> {
    await this.propertyService.getPhotoIds(idProperty).toPromise().then((res) => {
      this.imageIdList = res.data
    })
    let imagesToShow: any[] = []
    for (let imgId of this.imageIdList) {
      this.propertyService.getImage(imgId).subscribe((res: any) => {
          this.retrieveResponse = res.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.retrieveResponse;
          imagesToShow.push(this.sanitizer.bypassSecurityTrustUrl(this.retrievedImage));
        }
      );
    }
    return imagesToShow;
  }


  likeAp: any = false;

  likeApartment(idProperty: any) {
    console.log(idProperty)
    this.propertyService.likeApartment(this.idUser, idProperty).subscribe(response => {
      if (response.success) {
        for (let ap of this.apartments)
          if (ap.idProperty == idProperty)
            ap.liked = true;
        // this.likeAp = true;
        this.messageService.add({severity: 'info', summary: 'Liked', detail: 'Saved to your favourites!'});
      }
    });
    for (let i = 0; i < this.apartments.length; i++)
      console.log("Apartments: " + this.apartments[i].liked)
  }

  dislikeApartment(idProperty: any) {
    let idUser: any;
    idUser = localStorage.getItem('idUser')

    this.propertyService.dislikeApartment(idUser, idProperty).subscribe(response => {
      if (response.success) {
        for (let i = 0; i < this.apartments.length; i++)
          if (this.apartments[i].idProperty == idProperty)
            this.apartments[i].liked = false;
        // this.likeAp = true;
        // console.log(this.likeAp)
        this.messageService.add({
          severity: 'info',
          summary: 'Removed from liked',
          detail: 'Removed from your favourites!'
        });
      }
    });

    this.propertyService.getLikedApartments(this.idUser).toPromise().then((response) => {
      if (response.success)
        console.log("innn")
      this.apartments = response.data;
    })
    console.log("innn")
    this.router.navigate(['liked-properties'])
    // $("#divToReload").load(location.href + " #divToReload");

    // $("divToReload").relo()
  }

  public async toggleSelected(propertyId: number) {
    for (let ap of this.apartments) {
      if (ap.idProperty == propertyId) {
        if (await this.checkIfApartmentIsInFavourites(propertyId)) {
          ap.liked = false;
          this.propertyService.dislikeApartment(this.idUser, propertyId).subscribe(response => {
            if (response.success) {
              this.messageService.add({
                severity: 'info',
                summary: 'Removed from liked',
                detail: 'Removed from your favourites!'
              });
              this.propertyService.getLikedApartments(this.idUser).toPromise().then((response) => {
                if (response.success)
                  this.apartments = response.data;
              })
              // location.reload()
              this.router.navigate(['liked-properties'])
            }
          });
        }
        else if (!await this.checkIfApartmentIsInFavourites(propertyId)) {
          ap.liked = true;
          this.propertyService.likeApartment(this.idUser, propertyId).subscribe(response => {
            if (response.success) {
              this.messageService.add({severity: 'info', summary: 'Liked', detail: 'Saved to your favourites!'});
            }
          });
          return
        }
        return
      }
    }


    return this.selectedChange.emit(this.selected);
  }


  public async checkIfApartmentIsInFavourites(propertyId: number): Promise<boolean> {
    await this.propertyService.getLikedApartments(this.currentUser.idUser).toPromise().then(response => {
      if (response.success) {
        this.currentUser.likedApartments = response.data;
      }})
    for (let ap of this.currentUser.likedApartments) {
      if (ap.idProperty == propertyId) {
        return true;
      }
    }
    return false;
  }


  closeResult: any;

  openVerticallyCentered(content: any) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
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

  public sendRentalRequest(apartment: Property) {
    let rentalRequest = {} as RentalRequest;
    rentalRequest.question1 = this.rentalRequest.controls['question1'].value;
    rentalRequest.question2 = this.rentalRequest.controls['question2'].value;
    rentalRequest.question3 = this.rentalRequest.controls['question3'].value;
    if (rentalRequest.question1==null || rentalRequest.question2==null || rentalRequest.question3==null){
      this.messageService.add({severity: 'error', summary: 'Please answer all questions', detail: ""})
      return
    }
    rentalRequest.idLandlord = Number(apartment.idUser);
    rentalRequest.idTenant = Number(localStorage.getItem("idUser"));
    rentalRequest.idProperty = apartment.idProperty;
    this.backendWsService.saveRentalRequest(rentalRequest);
    this.messageService.add({severity: 'success', summary: 'Succesfully sent rental request', detail: ""})
    this.modalService.dismissAll();

    // this.propertyService.sendRentalRequest(rentalRequest, Number(apartment.idUser), Number(localStorage.getItem("idUser")), apartment.idProperty).subscribe(response => {
    //     if (response.success) {
    //       this.messageService.add({severity: 'success', summary: 'Succesfully sent rental request', detail: "null"})
    //       this.modalService.dismissAll();
    //     }
    //   }
    // );
    // this.sendMessage(rentalRequest)
  }


}
