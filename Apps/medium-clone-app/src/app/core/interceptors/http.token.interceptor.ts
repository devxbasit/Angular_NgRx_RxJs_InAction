import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestHeaders } from '../models/request-headers.model';
import { JwtService } from '../services/jwt.service';

export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtService = inject(JwtService);
    const token = jwtService.getToken();

    const headersConfig: RequestHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };
    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
    }

    const updatedRequest = req.clone({ setHeaders: headersConfig });

    return next.handle(updatedRequest);
  }
}
