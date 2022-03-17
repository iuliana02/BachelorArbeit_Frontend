import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Property} from "../../model/property";
import {PropertyService} from "../../service/property.service";
import {MessageService} from "primeng/api";
import {InputTextModule} from 'primeng/inputtext';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
      newPropertyForm!: FormGroup;
  property = {} as Property;
  selectedFiles: File;
  // currentFileUpload : FileList = {} as File;
  anyFieldEmpty: boolean = false;
  emptyLand: boolean = false;
  emptyCity: boolean = false;
  emptyStreet: boolean = false;
  emptyNumber: boolean = false;
  emptydescription: boolean = false;
  emptydivType: boolean = false;
  emptyArea: boolean = false;
  emptyNrRooms: boolean = false;
  emptyNrBathrooms: boolean = false;
  emptyFloor: boolean = false;
  emptyAvailableFrom: boolean = false;
  emptyStyle: boolean = false;
  emptyParking: boolean = false;
  message!: string;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef | undefined;


  constructor(private formBuilder : FormBuilder,
              private router: Router,
              private propertyService: PropertyService,
              private messageService: MessageService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.newPropertyForm = new FormGroup({
      land: new FormControl(),
      city: new FormControl(),
      street: new FormControl(),
      nr: new FormControl(),
      description: new FormControl(),
      style: new FormControl(),
      divisionType: new FormControl(),
      area: new FormControl(),
      nrOfRooms: new FormControl(),
      nrOfBathrooms: new FormControl(),
      floor: new FormControl(),
      availableFrom: new FormControl(),
      parkingLotsAvailable: new FormControl(),
      propertyImage: new FormControl()
    })
  }

  selectFile(event: any) {
    // const file = event.target.files.item(0);
    //
    // if (file.type.match('image.*')) {
    //   var size = event.target.files[0].size;
    //   if(size > 1000000)
    //   {
    //     alert("size must not exceeds 1 MB");
    //     // @ts-ignore
    //     this.newPropertyForm.get('propertyImage').setValue("");
    //   }
    //   else
    //   {
        this.selectedFiles = event.target.files[0];
    //   }
    // } else {
    //   alert('invalid format!');
    // }

    console.log(this.selectedFiles)
  }

  saveProperty() {
    let newProperty = {} as Property;
    newProperty.land = this.newPropertyForm.controls['land'].value;
    newProperty.city = this.newPropertyForm.controls['city'].value;
    newProperty.street = this.newPropertyForm.controls['street'].value;
    newProperty.nr = this.newPropertyForm.controls['nr'].value;
    newProperty.description = this.newPropertyForm.controls['description'].value;
    newProperty.divisionType = this.newPropertyForm.controls['divisionType'].value;
    newProperty.area = this.newPropertyForm.controls['area'].value;
    newProperty.nrOfRooms = this.newPropertyForm.controls['nrOfRooms'].value;
    newProperty.nrOfBathromms = this.newPropertyForm.controls['nrOfBathrooms'].value;
    newProperty.floor = this.newPropertyForm.controls['floor'].value;
    newProperty.availableFrom = this.newPropertyForm.controls['availableFrom'].value;
    newProperty.style = this.newPropertyForm.controls['style'].value;
    newProperty.parkingLotsAvailable = this.newPropertyForm.controls['parkingLotsAvailable'].value;

    if (newProperty.land == null) {
      this.emptyLand = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.city == null) {
      this.emptyCity = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.street == null) {
      this.emptyStreet = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.nr == null) {
      this.emptyNumber = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.description == null) {
      this.emptydescription = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.divisionType == null) {
      this.emptydivType = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.area == null) {
      this.emptyArea = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.nrOfRooms == null) {
      this.emptyNrRooms = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.nrOfBathromms == null) {
      this.emptyNrBathrooms = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.floor == null) {
      this.emptyFloor = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.availableFrom == null) {
      this.emptyAvailableFrom = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.style == null) {
      this.emptyStyle = true;
      this.anyFieldEmpty = true;
    }
    if (newProperty.parkingLotsAvailable == null) {
      this.emptyParking = true;
      this.anyFieldEmpty = true;
    }

    if (this.anyFieldEmpty) {
      this.messageService.add({severity: 'error', summary: 'All fields must be completed!', detail: '\n Property has not been added'});
      this.anyFieldEmpty = false
      return;
    }

    this.propertyService.addProperty(newProperty, Number(localStorage.getItem("idUser"))).subscribe(response => {
      if (response.success) {
        console.log("property success")
        if (this.selectedFiles != null) {
          this.uploadPhoto()
        }
        this.messageService.add({severity: 'success', summary: 'Succesfully added new property', detail: "null"})
        this.property = response.data;
      }
    })
  }

  uploadPhoto() {
    console.log(this.selectedFiles);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFiles, this.selectedFiles.name);
    //Make a call to the Spring Boot Application to save the image
    this.http.post('http://localhost:4201/property/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
  );
  }

}
