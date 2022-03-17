import { Injectable } from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {delay, Observable} from "rxjs";
import {User} from "../model/user";
import {Property} from "../model/property";
import {HttpClient, HttpParams} from "@angular/common/http";
// @ts-ignore
import { Http} from '@angular/common/http';
import {RentalRequest} from "../model/rentalRequest";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private backendService: BackendService, private http: HttpClient) { }

  private baseURL = 'http://localhost:4201/property';

  public getAllProperties(): Observable<any> {
    const options = {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      }
    };
    return this.backendService.get(`${this.baseURL}/getAll`, options);
  }

  public addProperty(property: Property, idUser: number){
    let params = new HttpParams();
    params = params.append('userId', idUser);
    const options = {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(property);
    return this.backendService.post(`${this.baseURL}/add`, body, params);
  }


  async getImage(idProperty: number) {
    console.log("before")
    let idPhoto = await this.getPhotoIds(idProperty);
    console.log(idPhoto)
    console.log("after")

    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        "Content-Type": "application/json"
      }
    };
    await (10000)
    return this.http.get(`http://localhost:4201/property/get/${idPhoto}`, options);
  }



  async getPhotoIds(idProperty: number) {
    let idPhoto: any;
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        "Content-Type": "application/json"
      }
    };
    await this.backendService.get(`${this.baseURL}/getPhotoIds/` + idProperty, options).subscribe(res => {
        idPhoto = res.data;
        console.log("ID PROPERTY" + idProperty)
        console.log("ID PHOTO" + idPhoto)
      });
    return idPhoto;
  }


  likeApartment(idUser: number, idProperty: number) {
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        "Content-Type": "application/json"
      }};
    let params = new HttpParams();
    params = params.append('userId', idUser);
    params = params.append('propertyId', idProperty);
    return this.backendService.post(`${this.baseURL}/likeApartment`,null, params);
  }

  dislikeApartment(idUser: number, idProperty: number) {
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        "Content-Type": "application/json"
      }};
    let params = new HttpParams();
    params = params.append('userId', idUser);
    params = params.append('propertyId', idProperty);
    return this.backendService.post(`${this.baseURL}/removeFromLikedApartments`,null, params);
  }

  getLikedApartments(userId: number) {
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.backendService.get(`${this.baseURL}/getLikedApartments`, params);

  }

  sendRentalRequest(rentalRequest: RentalRequest, idLandlord: number, idTenant: number , idProperty: number){
    let params = new HttpParams();
    params = params.append('idLandlord', idLandlord);
    params = params.append('idTenant', idTenant);
    params = params.append('idProperty', idProperty);
    const body = JSON.stringify(rentalRequest);
    return this.backendService.post(`http://localhost:4201/rentalRequest/add`, body, params);
  }

}
