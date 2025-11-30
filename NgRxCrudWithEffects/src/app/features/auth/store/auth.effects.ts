import { IUser } from './../../../core/interfaces/core.interface.ts';
import { IAppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import {
  autoSignInAction,
  autoSignOutAction,
  signInStartAction,
  signInSuccessAction,
  signupStartAction,
  signupSuccessAction,
} from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { CacheService } from 'src/app/core/services/cache.service';
import { setNotificationAction } from 'src/app/Shared/store/shared.actions';
import { notificationSelector } from 'src/app/Shared/store/shared.selectors.js';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  actions = inject(Actions);
  authService = inject(AuthService);
  cacheService = inject(CacheService);
  router = inject(Router);
  store = inject(Store<IAppState>);

  signInEffect$ = createEffect(() => {
    return this.actions.pipe(
      ofType(signInStartAction),
      exhaustMap((action) => {
        return this.authService.signIn(action.email, action.password).pipe(
          map((signInResponse) =>
            this.authService.formatAuthResponseToUser(signInResponse)
          ),
          tap((user) => {
            this.cacheService.put('user', JSON.stringify(user));
          }),
          map((user: IUser) => {
            return signInSuccessAction({ user: user, redirect: true });
          }),
          catchError((error: Error) => {
            return of(
              setNotificationAction({
                notification: { message: error.message, type: 'error' },
              })
            );
          })
        );
      })
    );
  });

  signUpEffect$ = createEffect(() => {
    return this.actions.pipe(
      ofType(signupStartAction),
      exhaustMap((action) => {
        return this.authService.signup(action.email, action.password).pipe(
          map((signUpResponse) =>
            this.authService.formatAuthResponseToUser(signUpResponse)
          ),
          tap((user: IUser) => {
            this.cacheService.put('user', JSON.stringify(user));
          }),
          map((user: IUser) => {
            return signupSuccessAction({ user: user, redirect: true });
          }),
          catchError((error: Error) => {
            return of(
              setNotificationAction({
                notification: { message: error.message, type: 'error' },
              })
            );
          })
        );
      })
    );
  });

  authRedirectEffect$ = createEffect(
    () => {
      return this.actions.pipe(
        ofType(...[signInSuccessAction, signupSuccessAction]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  // autoSignInEffect$ = createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(autoSignInAction),
  //     map((action) => {
  //       const cacheUser = this.cacheService.get('user');
  //       if (cacheUser) {
  //         const user: IUser = JSON.parse(cacheUser);
  //         return of(signInSuccessAction({ user: user, redirect: false }));
  //       } else {
  //         return of(
  //           setNotificationAction({
  //             notification: {
  //               message: '[Cache User is Null] Cannot auto SignIn',
  //               type: 'error',
  //             },
  //           })
  //         );
  //       }
  //     })
  //   );
  // });

  // autoLogoutEffect$ = createEffect(
  //   () => {
  //     return this.actions.pipe(
  //       ofType(autoSignOutAction),
  //       tap((action) => {
  //         this.cacheService.delete('user');
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );
}
