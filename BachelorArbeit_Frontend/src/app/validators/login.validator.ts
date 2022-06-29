import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import {MockUserService} from "./mock-login.service";
import {ValidationResponse} from "../model/validationResponse";

@Injectable({ providedIn: 'root' })
export class LoginValidator implements AsyncValidator {
  private cancel$ = new Subject<void>();

  constructor(private mockUserService: MockUserService) {}

  validate(
    { value }: AbstractControl,
  ): Observable<ValidationErrors | null>{
    this.cancel$.next();

    if (!value) {
      // @ts-ignore
      return null;
    }

    return of(value).pipe(
      debounceTime(500),
      switchMap(username => this.mockUserService.validateUsername(username).pipe(
        takeUntil(this.cancel$),
        map<ValidationResponse, ValidationErrors>(
          async (resp: any) => resp.operationResultCode === 'INVALID' ? {
              invalidUsername: {
                value,
                message: resp.messageList[0],
              },
            }
            : null
        ),
      )),
    );
  }
}
