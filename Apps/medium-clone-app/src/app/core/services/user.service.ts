import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, distinctUntilChanged, map, tap } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  public currentUser$: Observable<User> = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable().pipe(tap((data) => console.log(`service is auth ${data}`)));

  private apiService: ApiService = inject(ApiService);
  private jwtService: JwtService = inject(JwtService);
  dRef = inject(DestroyRef);

  populate() {
    const token = this.jwtService.getToken();

    if (token) {
      this.apiService
        .get('/user')
        .pipe(takeUntilDestroyed(this.dRef))
        .subscribe({
          next: (data) => {
            this.setAuth({ ...data.user, token: token });
          },
          error: () => {
            this.purgeAuth();
          },
        });
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    console.log('currenc utser =------- >', user);
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    console.log('current user =------- >', {});

    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: string, credentials: any): Observable<User> {
    const route = `${type.toLocaleLowerCase() === 'login' ? '/login' : ''}`;

    return this.apiService.post(`/users${route}`, { user: credentials }).pipe(
      map((data) => {
        this.setAuth(data.user);
        return data.user;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  updateUser(user: User) {
    return this.apiService.put('/user', { user: user }).pipe(
      map((data) => {
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }
}
