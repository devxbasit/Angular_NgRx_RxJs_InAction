import { NgModule } from '@angular/core';
import { ArticleComponent } from './components/article/article.component';
import { ArticleCommentComponent } from './components/article-comment/article-comment.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { ArticleDashboardComponent } from './components/article-dashboard/article-dashboard.component';

@NgModule({
  imports: [SharedModule, ArticleRoutingModule],
  declarations: [ArticleComponent, ArticleCommentComponent, MarkdownPipe, ArticleDashboardComponent],

  providers: [],
})
export class ArticleModule {}
