import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../user/authentication.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.token.length){
            const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${this.authService.token}`)
            });
            
            return next.handle(req);
        }
        return next.handle(req);
    }
}