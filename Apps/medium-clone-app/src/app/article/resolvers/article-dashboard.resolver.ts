import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleListConfig } from 'src/app/core/models/article-list-config.model';
import { Article } from 'src/app/core/models/article.model';
import { ArticlesService } from 'src/app/core/services/articles.service';


export class ArticleDashboardResolver implements Resolve<Article[]> {
  

  articleService = inject(ArticlesService);
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Article[] | Observable<Article[]> | Promise<Article[]> {


      const articleFilterConfig: ArticleListConfig =  {
        
      }
    return this.articleService.query()
      
  }
}