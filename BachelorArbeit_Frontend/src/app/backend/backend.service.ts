import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public get(url:string, params?:any): Observable<any> {
    return this.invoke('GET',url, null, params);
  }

  public post(url:string, data:any, params?:any): Observable<any> {
    return this.invoke('POST',url, data, params);
  }

  public put(url:string, data:any, params?:any): Observable<any> {
    return this.invoke('PUT',url, data, params);
  }

  private invoke(method:string, url:string, data: any={}, params?:any): Observable<any> {
    const options = {
      body: data,
      params,
      headers: {
        'Accept-Language': 'en',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      }
    };
    if (!url) {
      throw new Error('No URL provided.');
    }
    const requestURL = `${url}`;
    return this.http.request(method, requestURL, options);
  }
}
