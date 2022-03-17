import { Injectable } from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {
  private baseURL = 'http://localhost:4201/rentalRequest';

  constructor(private backendService: BackendService) { }

  public getNumberOfRentalRequests(idLandlord: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('idLandlord', idLandlord);
    return this.backendService.get(`${this.baseURL}/getNumberOfRentalRequests`, params)
  }

  public getRentalRequestsForLandlord(idLandlord: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('idUser', idLandlord);
    return this.backendService.get(`${this.baseURL}/getRequestsForLandlord`, params)
  }
}
