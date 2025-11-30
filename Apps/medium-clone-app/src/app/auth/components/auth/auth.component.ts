import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from 'src/app/core/models/errors.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  userService = inject(UserService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  dRef = inject(DestroyRef);
  cdRef = inject(ChangeDetectorRef);

  authForm: FormGroup;
  title = '';
  isLoginMode: boolean = true;
  isFormSubmitting: boolean = false;
  errors: Errors = { errors: {} };

  constructor() {
    this.authForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.url.pipe(takeUntilDestroyed(this.dRef)).subscribe((urlSegment: any) => {
      this.isLoginMode = urlSegment[urlSegment.length - 1].path === 'login' ? true : false;
      if (this.isLoginMode) {
        this.title = 'Sign In';
      } else {
        this.title = 'Sign Up';
        this.authForm.addControl('username', new FormControl('', [Validators.required]));
      }

      this.cdRef.markForCheck();
    });
  }

  onAuthFormSubmit() {
    this.isFormSubmitting = true;
    this.errors = { errors: {} };

    const authType = this.isLoginMode ? 'login' : 'register';
    const credentials = this.authForm.value;

    this.userService
      .attemptAuth(authType, credentials)
      .pipe(takeUntilDestroyed(this.dRef))
      .subscribe({
        next: (data: any) => {
          this.router.navigateByUrl('/');
        },
        error: (err: any) => {
          this.errors = err;
          this.isFormSubmitting = false;
          this.cdRef.markForCheck();
        },
      });
  }
}
