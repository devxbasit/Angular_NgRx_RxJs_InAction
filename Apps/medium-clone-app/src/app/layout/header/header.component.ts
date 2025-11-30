import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  userService = inject(UserService);
  cdRef = inject(ChangeDetectorRef);
  dRef = inject(DestroyRef);
  currentUser?: User;

  ngOnInit(): void {
    this.userService.currentUser$.pipe(takeUntilDestroyed(this.dRef)).subscribe({
      next: (currentUser: User) => {
        this.currentUser = currentUser;
        this.cdRef.markForCheck();
      },
      error: (error) => {
        this.cdRef.markForCheck();
      },
    });
  }
}
