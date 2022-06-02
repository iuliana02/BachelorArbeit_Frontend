import { Injectable } from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendService: BackendService, private http: HttpClient) { }

  private baseURL = 'http://localhost:4201/user';

  public getAllUsers(): Observable<any> {
    const options = {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'http://localhost:4201',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      }
    };
    return this.backendService.get(`${this.baseURL}/getAllUsers`, options);
  }

  public addUser(user: User): Observable<any> {
    const options = {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(user);
    return this.backendService.post(this.baseURL, body, options);
  }

  register(firstName: string, lastName: string, email:string, password: string, role: string) {
    let params = new HttpParams();
    params = params.append('firstName', firstName);
    params = params.append('lastName', lastName);
    params = params.append('username', email);
    params = params.append('password', password);
    params = params.append('role', role);
    return this.backendService.post(`${this.baseURL}/register`, null, params);
  }

  login(emailLogin: string, passwordLogin: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','http://localhost:4201');
    headers.append ('Access-Control-Allow-Origin', '*');
    headers.append( 'Access-Control-Allow-Credentials', 'true');

    let params = new HttpParams();
    params = params.append('username', emailLogin);
    params = params.append('password', passwordLogin);
    return this.backendService.post(`${this.baseURL}/login`,null, params);
  }

  logout(emailLogin: string) {
    let params = new HttpParams();
    params = params.append('username', emailLogin);
    return this.backendService.post(`${this.baseURL}/logout`,null, params);
  }

  updateUser(user:User): Observable<any> {
    const options = {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(user);
    return this.backendService.put(this.baseURL, body, options);
  }

  getUserById(id: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.backendService.get(`${this.baseURL}/getUserById`, params)
  }

  evaluateTenantRequest(landlordId: number, tenantId: number, idRequest: number, appointmentDate: Date) {
    let params = new HttpParams();
    params = params.append('landlordId', landlordId);
    params = params.append('tenantId', tenantId);
    params = params.append('idRequest', idRequest);
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(appointmentDate, 'YYYY-MM-dd HH:mm:ss')
    params = params.append('appointmentDate', String(formattedDate));
    return this.backendService.post(`${this.baseURL}/evaluateTenantRequest`, null, params)
  }

  getAcceptedTenantsForLandlord(landlordId: number) {
    let params = new HttpParams();
    params = params.append('landlordId', landlordId);
    return this.backendService.get(`${this.baseURL}/getAcceptedTenantsForLandlord`, params)
  }

  getEvaluatedRequestsForTenant(tenantId: number) {
    let params = new HttpParams();
    params = params.append('tenantId', tenantId);
    return this.backendService.get(`${this.baseURL}/getEvaluatedRequestsForTenant`, params)

  }

}
