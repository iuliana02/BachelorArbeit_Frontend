import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormControlName} from "@angular/forms";
import {Router} from "@angular/router";
import {Property} from "../../model/property";
import {PropertyService} from "../../service/property.service";
import {MessageService} from "primeng/api";
import {InputTextModule} from 'primeng/inputtext';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../../backend/backend.service";


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  newPropertyForm!: FormGroup;
  property = {} as Property;
  uploadedFiles: File[] = [];
  // currentFileUpload : FileList = {} as File;
  anyFieldEmpty: boolean;
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
  emptyNrOfBalconies: boolean = false;
  emptyStyle: boolean = false;
  emptyParking: boolean = false;
  message!: string;
  newProperty = {} as Property;
  predictedPrice : number;
  spinning: boolean = false;
  errorMessageForSave : boolean = false;
  errorMessageForPredict : boolean = false;

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
      nrOfBalconies: new FormControl(),
      parkingLotsAvailable: new FormControl(),
      propertyImage: new FormControl(),
      price: new FormControl()
    })
    this.anyFieldEmpty = false;

    console.log("idUser")
    console.log(localStorage.getItem("idUser"))
    console.log(localStorage)
  }

  onUpload(event:any) {
    for(let file of event.files) {
      for (let f of this.uploadedFiles)
        if (f == file)
          return;
      this.uploadedFiles.push(file);
      // this.uploadPhoto(file);
    }

    this.messageService.add({severity: 'info', summary: 'Photos uploaded', detail: ''});
  }

  setPropertyValues() {
    this.newProperty.land = this.newPropertyForm.controls['land'].value;
    this.newProperty.city = this.newPropertyForm.controls['city'].value;
    this.newProperty.street = this.newPropertyForm.controls['street'].value;
    this.newProperty.nr = this.newPropertyForm.controls['nr'].value;
    this.newProperty.description = this.newPropertyForm.controls['description'].value;
    this.newProperty.divisionType = this.newPropertyForm.controls['divisionType'].value;
    this.newProperty.area = this.newPropertyForm.controls['area'].value;
    this.newProperty.nrOfRooms = this.newPropertyForm.controls['nrOfRooms'].value;
    this.newProperty.nrOfBathrooms = this.newPropertyForm.controls['nrOfBathrooms'].value;
    this.newProperty.floor = this.newPropertyForm.controls['floor'].value;
    this.newProperty.availableFrom = this.newPropertyForm.controls['availableFrom'].value;
    this.newProperty.nrOfBalconies = this.newPropertyForm.controls['nrOfBalconies'].value;
    this.newProperty.style = this.newPropertyForm.controls['style'].value;
    this.newProperty.parkingLotsAvailable = this.newPropertyForm.controls['parkingLotsAvailable'].value;
    if (this.newPropertyForm.controls['price'].value != null)
      this.newProperty.price = this.newPropertyForm.controls['price'].value;
    else
      this.newProperty.price = this.predictedPrice;
  }

  saveProperty() {
    this.errorMessageForSave = true;
    this.errorMessageForPredict = false;
    this.setPropertyValues();
    this.validateFields();

    if (this.uploadedFiles.length < 4) {
      this.messageService.add({severity: 'error', summary: 'Please upload at least 4 images', detail: ""})
      return;
    }

    if (!this.anyFieldEmpty) {
      this.propertyService.addProperty(this.newProperty, Number(localStorage.getItem("idUser"))).subscribe(response => {
        if (response.success) {
          console.log("property success")
          if (this.uploadedFiles != null && this.uploadedFiles.length>=4)
            for (let file of this.uploadedFiles) {
              this.uploadPhoto(file);
            }

          this.messageService.add({severity: 'success', summary: 'Succesfully added new property', detail: ""})
          this.property = response.data;
        }
      })
    }
    else
      this.messageService.add({severity: 'error', summary: 'Property can not be added without all the fields completed'});
  }

  uploadPhoto(event:any) {
    // console.log(this.selectedFiles);
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', event, event.name);
    //Make a call to the Spring Boot Application to save the image
    // let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'multipart/form-data');
    console.log("hei")
    this.http.post('http://localhost:4201/property/upload', uploadImageData)
      .subscribe((response: any) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );
  }

  validateFields() {
    this.anyFieldEmpty = false;
    if (this.newProperty.land == null) {
      this.emptyLand = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyLand = false;
    }
    if (this.newProperty.city == null) {
      this.emptyCity = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyCity = false;
    }
    if (this.newProperty.street == null) {
      this.emptyStreet = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyStreet = false;
    }
    if (this.newProperty.nr == null) {
      this.emptyNumber = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyNumber = false;
    }
    if (this.newProperty.description == null) {
      this.emptydescription = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptydescription = false;
    }
    if (this.newProperty.divisionType == null) {
      this.emptydivType = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptydivType = false;
    }
    if (this.newProperty.area == null) {
      this.emptyArea = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyArea = false;
    }
    if (this.newProperty.nrOfRooms == null) {
      this.emptyNrRooms = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyNrRooms = false;
    }
    if (this.newProperty.nrOfBathrooms == null) {
      this.emptyNrBathrooms = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyNrBathrooms = false;
    }
    if (this.newProperty.floor == null) {
      this.emptyFloor = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyFloor = false;
    }
    if (this.newProperty.availableFrom == null) {
      this.emptyAvailableFrom = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyAvailableFrom = false;
    }
    if (this.newProperty.nrOfBalconies == null) {
      this.emptyNrOfBalconies = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyNrOfBalconies = false;
    }
    if (this.newProperty.style == null) {
      this.emptyStyle = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyStyle = false;
    }
    if (this.newProperty.parkingLotsAvailable == null) {
      this.emptyParking = true;
      this.anyFieldEmpty = true;
    }
    else {
      this.emptyParking = false;
    }

    if (this.anyFieldEmpty) {
      if (this.errorMessageForSave)
        this.messageService.add({severity: 'error', summary: 'All fields must be completed!', detail: '\n Property has not been added'});
      else if (this.errorMessageForPredict)
        this.messageService.add({severity: 'warning', summary: 'For a correct estimation, please complete all fields.'});
      // this.anyFieldEmpty = false
      return;
    }
  }

  resetNonemptyFields() {
    if (!this.anyFieldEmpty) {
      this.emptyLand = false;
      this.emptyCity = false;
      this.emptyStreet = false;
      this.emptyNumber = false;
      this.emptydescription = false;
      this.emptydivType = false;
      this.emptyArea = false;
      this.emptyNrRooms = false;
      this.emptyNrBathrooms = false;
      this.emptyFloor = false;
      this.emptyAvailableFrom = false;
      this.emptyNrOfBalconies = false;
      this.emptyStyle = false;
      this.emptyParking = false;
    }
  }

  async predictPrice() {
    this.errorMessageForPredict = true;
    this.errorMessageForSave = false;
    this.setPropertyValues();
    this.validateFields();
    this.propertyService.predictPrice(this.newProperty).subscribe(response => {
      if (response.success) {
        this.predictedPrice = parseInt(response.data);
        console.log(response.data);
      }
      else if (response.error && response.message == "Null values in the property object"){
        // this.messageService.add({severity: 'warning', summary: 'For a correct estimation, please complete all fields'});
      }
      else
        this.messageService.add({severity: 'warning', summary: 'The estimation process could not be completed!', detail: ''});
    })
    this.spinning = true;
    await new Promise(f => setTimeout(f, 3000));
    this.spinning = false;
  }

}
