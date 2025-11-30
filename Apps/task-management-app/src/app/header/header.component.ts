import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  isLoggedIn = false;
  private userSubject: Subscription;

  ngOnInit(): void {
    this.userSubject = this.authService.userSubject.subscribe((user: User) => {
      this.isLoggedIn = user ? true : false;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubject.unsubscribe();
  }
}
