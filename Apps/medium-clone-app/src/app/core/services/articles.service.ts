import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article } from '../models/article.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private apiService: ApiService) {}

  query(config: any): Observable<{ articles: Article[]; articlesCount: number }> {
    const params: any = {};

    Object.keys(config.filters).forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService.get('/articles' + (config.type === 'feed' ? '/feed' : ''), new HttpParams({ fromObject: params }));
  }

  get(slug: string): Observable<Article> {
    return this.apiService.get('/articles/' + slug).pipe(map((data) => data.article));
  }

  destroy(slug: string) {
    return this.apiService.delete('/articles/' + slug);
  }

  save(article: Article): Observable<Article> {
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug, { article: article }).pipe(map((data) => data.article));
    } else {
      return this.apiService.post('/articles/', { article: article }).pipe(map((data) => data.article));
    }
  }

  favorite(slug: string): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug: string): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }
}
