import { Injectable } from '@angular/core';
import {SocketClientService} from "../websocket/socket-client.service";
import {RentalRequest} from "../model/rentalRequest";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {first} from "rxjs/operators";

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

}
