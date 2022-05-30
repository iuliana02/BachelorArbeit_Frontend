import { Injectable } from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private backendService: BackendService) { }

  public getStatistics1(): Observable<any> {
    return this.backendService.get('http://localhost:4201/external/get');
  }

  public getDivisionTypes(): Observable<any> {
    return this.backendService.get('http://localhost:4201/external/getAbteilungsTypen');
  }
}
