import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MegaMenuItem, MessageService} from "primeng/api";
import {SharedService} from "../SharedService";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {RentalRequestService} from "../service/rental-request.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any = {} as User;
  users!: User[];
  role: String = '';
  notEditingProfile = true;
  notifications: number;

  constructor(private formBuilder : FormBuilder, private router: Router,
              private sharedService:  SharedService, private userService: UserService,
              private messageService: MessageService, private rentalRequestService: RentalRequestService) { }

  async ngOnInit(): Promise<any> {
    // @ts-ignore
    this.role = localStorage.getItem('role');
    console.log("Local storage: " + localStorage);
    this.sharedService.justProfilePage = true;

    await this.load();

    this.profileForm = new FormGroup({
        firstName: new FormControl({value:this.user.firstName, disabled:this.notEditingProfile}),
        lastName: new FormControl({value:this.user.lastName, disabled:this.notEditingProfile}),
        username: new FormControl({value:this.user.username, disabled:this.notEditingProfile}),
        phoneNumber: new FormControl({value:this.user.mobileNumber, disabled:this.notEditingProfile}),
        birthDay: new FormControl({value:this.user.birthDay, disabled:this.notEditingProfile})
      }
    )

    if (this.user.role == 'landlord') {
      this.rentalRequestService.getNumberOfRentalRequests(this.user.userId).subscribe(response => {
          this.notifications = response.data;
          console.log(response)
        }
      )
    }
  };

  edit() {
    this.profileForm.controls['firstName'].enable();
    this.profileForm.controls['lastName'].enable();
    this.profileForm.controls['username'].enable();
    this.profileForm.controls['phoneNumber'].enable();
    this.profileForm.controls['birthDay'].enable();
  }

  async load() {
    await this.userService.getAllUsers().toPromise().then((data) =>{
      if (data.success){
        this.users = data.data;
        console.log(this.users)
      }
    })
    this.user = this.users.find((x) => x.username === localStorage.getItem("emailLogin"));
    console.log("hereee")
    console.log(this.user)

  }

  async updateUser(): Promise<boolean> {
    let copyUser = Object.assign({}, this.user)
    copyUser.firstName = this.profileForm.controls['firstName'].value;
    copyUser.lastName = this.profileForm.controls['lastName'].value;
    copyUser.username = this.profileForm.controls['username'].value;
    copyUser.mobileNumber = this.profileForm.controls['phoneNumber'].value;
    copyUser.birthDay = this.profileForm.controls['birthDay'].value;

    let returnVal = await this.userService.updateUser(copyUser).toPromise();

    if (returnVal.success === true) {
      this.user = returnVal.data;
      console.log("v1  " + this.user)
      await this.load();
      this.profileForm.controls['firstName'].setValue(this.user.firstName);
      this.profileForm.controls['lastName'].setValue(this.user.lastName);
      this.profileForm.controls['phoneNumber'].setValue(this.user.mobileNumber);
      this.profileForm.controls['birthDay'].setValue(this.user.birthDay);
      this.disableInputs();
      this.messageService.add({severity: 'success', summary: 'Update', detail: 'User successfully updated!'});
      return true;
    }
    return false;
  }

  disableInputs() {
    this.profileForm.controls['firstName'].disable();
    this.profileForm.controls['lastName'].disable();
    this.profileForm.controls['username'].disable();
    this.profileForm.controls['phoneNumber'].disable();
    this.profileForm.controls['birthDay'].disable();
  }

  goToHome() {
    if (localStorage.getItem('role') == "landlord")
       this.router.navigate(['home-landlord'])
    else if (localStorage.getItem('role') == "tenant")
      this.router.navigate(['home-tenant'])
    this.sharedService.justProfilePage = false;
  }

  goToRentalRequests() {
    this.router.navigate(['rental-request'])
  }
}
