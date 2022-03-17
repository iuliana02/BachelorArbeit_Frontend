import { Injectable } from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

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
        'Access-Control-Allow-Origin': '*',
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
    params = params.append('email', email);
    params = params.append('password', password);
    params = params.append('role', role);
    return this.backendService.post(`${this.baseURL}/register`, null, params);
  }

  login(emailLogin: string, passwordLogin: string) {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Origin','http://localhost:4201/user/login');
    // headers.append ('Access-Control-Allow-Origin', '*');
    // headers.append( 'Access-Control-Allow-Credentials', 'true');

    let params = new HttpParams();
    params = params.append('emailLogin', emailLogin);
    params = params.append('passwordLogin', passwordLogin);
    return this.backendService.post(`${this.baseURL}/login`, null, params);
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

}
