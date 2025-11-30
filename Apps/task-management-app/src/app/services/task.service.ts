import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpEventType,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, catchError, throwError, tap, map } from 'rxjs';
import { Task } from '../models/Task';
import { AuthService } from './auth.service';
import { LoggingService } from './logging.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  httpClient = inject(HttpClient);
  loggingService = inject(LoggingService);
  authService = inject(AuthService);
  errorSubject = new Subject<HttpErrorResponse>();

  CreateTask(task: Task) {
    this.httpClient
      .post<{ name: string }>(
        `${environment.firebaseTaskManagementDbBaseUrl}/tasks.json`,
        task
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };

          this.loggingService.logError(errorObj);

          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  DeleteTask(id: string) {
    this.httpClient
      .delete(`${environment.firebaseTaskManagementDbBaseUrl}/tasks/${id}.json`)
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };

          this.loggingService.logError(errorObj);

          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  DeleteAllTasks() {
    this.httpClient
      .delete(`${environment.firebaseTaskManagementDbBaseUrl}/tasks.json`, {
        observe: 'events',
        responseType: 'json',
      })
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.Sent) {
          }
        }),
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };

          this.loggingService.logError(errorObj);

          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  GetAllTasks() {
    return this.httpClient
      .get(`${environment.firebaseTaskManagementDbBaseUrl}/tasks.json`)
      .pipe(
        map((response) => {
          let tasks = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              tasks.push({ ...response[key], id: key });
            }
          }
          return tasks;
        }),
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };

          this.loggingService.logError(errorObj);

          return throwError(() => err);
        })
      );
  }

  UpdateTask(id: string | undefined, data: Task) {
    this.httpClient
      .put(
        `${environment.firebaseTaskManagementDbBaseUrl}/tasks/${id}.json`,
        data
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };

          this.loggingService.logError(errorObj);

          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  getTaskDetails(id: string | undefined) {
    return this.httpClient
      .get(`${environment.firebaseTaskManagementDbBaseUrl}/tasks/${id}.json`)
      .pipe(
        map((response) => {
          let task = {};
          task = { ...response, id: id };
          return task;
        })
      );
  }
}
