import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListErrorsComponent } from './components/list-errors/list-errors.component';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './components/article-helpers/article-list/article-list.component';
import { ArticleMetaComponent } from './components/article-helpers/article-meta/article-meta.component';
import { ArticlePreviewComponent } from './components/article-helpers/article-preview/article-preview.component';
import { FavoriteButtonComponent } from './components/buttons/favorite-buttton/favorite-buttton.component';
import { FollowButtonComponent } from './components/buttons/follow-button/follow-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListErrorsComponent, ShowAuthedDirective, ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent, FavoriteButtonComponent, FollowButtonComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ListErrorsComponent,
    ShowAuthedDirective,
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
  ],
})
export class SharedModule {}
