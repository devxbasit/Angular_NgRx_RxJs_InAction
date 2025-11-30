import { Component, Input } from '@angular/core';
import { Article } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss'],
})
export class ArticleMetaComponent {
  @Input({ required: true }) article: Article = {} as Article;
}
