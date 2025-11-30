import { DestroyRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { takeUntil, tap } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Directive({
  selector: '[appShowAuthed]',
})
export class ShowAuthedDirective implements OnInit {
  private _condition: boolean = false;
  templateRef = inject(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);
  userService = inject(UserService);
  dref = inject(DestroyRef);

  @Input({ required: true })
  set appShowAuthed(condition: boolean) {
    this._condition = condition;
  }

  ngOnInit(): void {
    this.userService.isAuthenticated$
      .pipe(
        takeUntilDestroyed(this.dref),
        tap((data) => console.log(`directive show authe is auth ${data}`))
      )
      .subscribe((isAuthenticated) => {
        if ((isAuthenticated && this._condition) || (!isAuthenticated && !this._condition)) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      });
  }
}
