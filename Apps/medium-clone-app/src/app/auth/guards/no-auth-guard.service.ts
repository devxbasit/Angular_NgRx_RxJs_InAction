import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  userService = inject(UserService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => !isAuthenticated)
    );
  }
}
