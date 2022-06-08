import { Injectable } from '@angular/core';
import {SocketClientService} from "../websocket/socket-client.service";
import {RentalRequest} from "../model/rentalRequest";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {first} from "rxjs/operators";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class BackendWsService {

  constructor(private socketClient: SocketClientService) { }

  saveRentalRequest(request: RentalRequest, headers?: any) {
    return this.socketClient.send('/topic/rental-request/add', headers, request);
  }

  onRentalRequest(): Observable<RentalRequest> {
    return this.socketClient
      .onMessage(`/topic/rental-request/created`)
      .pipe(map(requests => requests.data));
  }

  getNonevaluatedRequests(idUser: number): Observable<RentalRequest[]> {
    return this.socketClient
      .onMessage(`/topic/getNonevaluatedRequestsForLandlord/${idUser}`)
      .pipe(first(), map(requests => requests.data))
  }


  evaluateRequest(landlordId: number, tenantId: number, idRequest: number, appointmentDate: Date): any {
    // let headers = new Headers()
    // headers.append('landlordId', String(landlordId))
    // headers.append('tenantId', String(tenantId))
    // headers.append('idRequest', String(idRequest))
    // headers.append('appointmentDate', String(appointmentDate))
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(appointmentDate, 'YYYY-MM-dd HH:mm:ss')
    return this.socketClient.send(`/topic/rental-request/evaluate/${landlordId}/${tenantId}/${idRequest}/${formattedDate}`)
  }

  onEvaluatedRequest(): Observable<any[]> {
    return this.socketClient
      .onMessage(`/topic/rental-request/evaluated`)
      .pipe(map(requests => requests.data));
  }

  getEvaluatedRequestsForTenant(tenantId: number): Observable<any[]> {
    return this.socketClient
      .onMessage(`/topic/getEvaluatedRequestsForTenant/${tenantId}`)
      .pipe(map(requests => requests.data))
  }
}
