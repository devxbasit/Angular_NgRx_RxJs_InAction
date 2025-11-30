import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class JwtService {
  getToken(): string {
    return window.localStorage[environment.jwtTokenKey];
  }

  saveToken(token: string) {
    window.localStorage[environment.jwtTokenKey] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(environment.jwtTokenKey);
  }
}
