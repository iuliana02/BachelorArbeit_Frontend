import { Injectable } from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {
  private baseURL = 'http://localhost:4201/rentalRequest';

  constructor(private backendService: BackendService, private http: HttpClient) { }

  public getNumberOfRentalRequests(idLandlord: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('idLandlord', idLandlord);
    return this.backendService.get(`${this.baseURL}/getNumberOfRentalRequests`, params)
  }

  public getRentalRequestsForLandlord(idLandlord: number):Observable<any> {
    let params = new HttpParams();
    params = params.append('idUser', idLandlord);
    return this.backendService.get(`${this.baseURL}/getRequestsForLandlord`, params)
  }

  public getEvaluatedRentalRequestsForLandlord(idLandlord: number):Observable<any> {
    let params = new HttpParams();
    params = params.append('idUser', idLandlord);
    return this.backendService.get(`${this.baseURL}/getEvaluatedRentalRequestsForLandlord`, params)
  }

  public getNonevaluatedRentalRequestsForLandlord(idLandlord: number):Observable<any> {
    let params = new HttpParams();
    params = params.append('idUser', idLandlord);
    return this.backendService.get(`${this.baseURL}/getNonevaluatedRequestsForLandlord`, params)
  }

  public async removeRentalrequest(propertyId: number) {
    let params = new HttpParams();
    params = params.append('propertyId', propertyId);
    return this.backendService.post(`${this.baseURL}/deleteRequestByPropertyId`,null, params)
  }
}
