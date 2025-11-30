import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, inject, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { concat, concatMap, of, take, tap } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-buttton.component.html',
  styleUrls: ['./favorite-buttton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteButtonComponent {
  @Input({ required: true }) article: Article = {} as Article;
  @Output() toggle = new EventEmitter<boolean>();

  userService = inject(UserService);
  articleService = inject(ArticlesService);
  cdRef = inject(ChangeDetectorRef);
  router = inject(Router);
  isSubmitting = false;

  toggleStatus() {
    this.isSubmitting = true;

    this.userService.isAuthenticated$
      .pipe(
        take(1),
        concatMap((isAuthenticated: boolean) => {
          if (!isAuthenticated) {
            this.router.navigateByUrl('/');
            return of(null);
          }

          if (this.article.favorited) {
            return this.articleService.unfavorite(this.article.slug).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                (error) => {
                  this.isSubmitting = false;
                }
              )
            );
          } else {
            return this.articleService.favorite(this.article.slug).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                (error) => {
                  this.isSubmitting = false;
                }
              )
            );
          }
        })
      )
      .subscribe(() => {
        this.cdRef.markForCheck();
      });
  }
}
