import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors } from 'src/app/core/models/errors.model';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements AfterViewInit {
  settingsForm: FormGroup;
  fb = inject(FormBuilder);
  userService = inject(UserService);
  user: User = {} as User;
  router = inject(Router);
  cdRef = inject(ChangeDetectorRef);
  dRef = inject(DestroyRef);
  isFormSubmitting = false;
  errors: Errors = { errors: {} };

  constructor() {
    this.settingsForm = this.fb.group({
      image: this.fb.control('', [Validators.required]),
      username: this.fb.control('', [Validators.required]),
      bio: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  ngAfterViewInit(): void {
    Object.assign(this.user, this.userService.getCurrentUser());

    // TODO: issue on reload setting page, fix -> wait until new user is emitted
    setTimeout(() => {
      console.log('patch -------------> ');
      this.settingsForm.patchValue(this.user);
    }, 0);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  onSettingsFormSubmit() {
    this.isFormSubmitting = true;
    this.errors = { errors: {} };

    this.updateUser(this.settingsForm.value);
    console.log(this.user);
    this.userService
      .updateUser(this.user)
      .pipe(takeUntilDestroyed(this.dRef))
      .subscribe({
        next: (updatedUser) => {
          console.log(updatedUser);
          this.router.navigateByUrl('/profile/' + updatedUser.username);
        },
        error: (error: Errors) => {
          this.errors = error;
          this.isFormSubmitting = false;
          this.cdRef.markForCheck();
        },
      });
  }

  private updateUser(user: User) {
    Object.assign(this.user, user);
  }
}
