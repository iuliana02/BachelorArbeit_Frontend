import { Injectable } from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseURL = 'http://localhost:4201/notifications';

  constructor(private backendService: BackendService) { }

  getNotificationsForUser(idUser: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('idUser', idUser);
    return this.backendService.get(`${this.baseURL}/get`, params);
  }
}
