import { Injectable } from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseURL = 'http://localhost:4201/notifications';

  constructor(private http: HttpClient, private backendService: BackendService) { }

  getNotificationsForUser(): Observable<any>{
    const options = {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': '*',
        'Accept': '*',
        'Origin':'*',
        'Access-Control-Allow-Origin': 'http://localhost:4201',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    };
    let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Origin','http://localhost:4201/notifications');
    // headers.append ('Access-Control-Allow-Origin', 'http://localhost:4201/notifications');
    // headers.append( 'Access-Control-Allow-Credentials', 'true');
    headers.append( 'Authorization', String(localStorage.getItem('token')));

    return this.backendService.get(`${this.baseURL}/get`);
  }
}
