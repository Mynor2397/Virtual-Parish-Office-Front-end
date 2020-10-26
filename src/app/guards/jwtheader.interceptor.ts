import { Injectable, Type } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class Jwtheader implements HttpInterceptor {
    constructor(private authService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const user = this.authService.userValue;
      const isLoggedIn = user && user.token;
  
      const isApiUrl = request.url.startsWith(environment.URL);
  
      if (isLoggedIn && isApiUrl) {
        request = request.clone({
          setHeaders: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });
      }
  
      return next.handle(request);
    }
}