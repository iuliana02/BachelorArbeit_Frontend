import {Observable} from "rxjs";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== 'http://localhost:4201/user/login' && req.url !== 'http://localhost:4201/user/register') {

      req = req.clone({
        setHeaders: {
          // 'Content-Type': 'multipart/form-data',
          'Accept': 'application/json; multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': 'http://localhost:4201',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Origin; Content-Type; X-Auth-Token; content-type'
        },
      });
    }
    return next.handle(req);
  }
}
