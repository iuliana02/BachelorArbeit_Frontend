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
        'Access-Control-Allow-Origin': 'http://localhost:4201',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      }
    };
    return this.backendService.get(`${this.baseURL}/getAll`, options);
  }

  public getAllPropertiesForLandlord(): Observable<any> {
    const options = {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'http://localhost:4201',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      }
    };
    return this.backendService.get(`${this.baseURL}/getAllForLandlord`, options);
  }

  public addProperty(property: Property, idUser: number){
    let params = new HttpParams();
    params = params.append('userId', idUser);
    const options = {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json; multipart/form-data'
      }
    };
    const body = JSON.stringify(property);
    return this.backendService.post(`${this.baseURL}/add`, body, params);
  }


  getImage (idPhoto: number) {
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        "Content-Type": "application/json"
      }
    };
    return this.http.get(`http://localhost:4201/property/get/` + idPhoto, options);
  }



   getPhotoIds(idProperty: number): Observable<any> {
    const options = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        "Content-Type": "application/json"
      }
    };
    return this.backendService.get(`${this.baseURL}/getPhotoIds/` + idProperty, options);
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

  getLikedApartments(userId: number): Observable<any>  {
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

  predictPrice(apartment: Property) {
    const body = JSON.stringify(apartment);
    console.log("body")
    console.log(body)
    return this.backendService.post(`http://localhost:4201/external/predict`, body);
  }

  getPropertyWithMostLikes(): Observable<any>{
    return this.backendService.get(`${this.baseURL}/getPropertyWithMostLikes`)
  }

}
