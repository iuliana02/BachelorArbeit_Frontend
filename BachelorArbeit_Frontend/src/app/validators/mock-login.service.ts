import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import {ValidationResponse} from "../model/validationResponse";

@Injectable({
  providedIn: 'root',
})
export class MockUserService {
  validateUsername(username: string): Observable<ValidationResponse> {
    return inquireUsername(username).pipe(delay(1000));
  }
}

function inquireUsername(username: string): Observable<ValidationResponse> {
  if (username.length < 6) {
    return of({ operationResultCode: 'INVALID', messageList: ['Username must have at least 6 characters.'] });
  }

  return of({ operationResultCode: 'VALID' });
}
