import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpClient = inject(HttpClient);

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient
      .get(`${environment.apiBaseUrl}${path}`, {
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}${path}`, JSON.stringify(body)).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}${path}`, JSON.stringify(body)).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiBaseUrl}${path}`).pipe(catchError(this.formatErrors));
  }

  private formatErrors(httpErrorResponse: HttpErrorResponse) {
    console.log('API_Service_ERROR -------> Below');
    console.log(httpErrorResponse);
    return throwError(httpErrorResponse.error);
  }
}
