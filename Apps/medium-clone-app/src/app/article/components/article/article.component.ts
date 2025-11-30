import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/core/models/article.model';
import { Comment } from 'src/app/core/models/comment.model';
import { Errors } from 'src/app/core/models/errors.model';
import { User } from 'src/app/core/models/user.model';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { CommentsService } from 'src/app/core/services/comments.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  commentService = inject(CommentsService);
  userService = inject(UserService);
  articleService = inject(ArticlesService);
  cdRef = inject(ChangeDetectorRef);

  article: Article = {} as Article;
  currentUser: User = {} as User;
  canModify = false;
  comments: Comment[] = [];
  commentControl = new FormControl('', [Validators.required]);
  commentFormErrors: Errors = { errors: {} };
  isSubmitting = false;
  isDeleting = false;

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.article = data['article'];

      this.populateComments();
      this.cdRef.markForCheck();
    });

    this.userService.currentUser$.subscribe((userData: User) => {
      this.currentUser = userData;

      this.canModify = this.currentUser.username === this.article.author.username;
      this.cdRef.markForCheck();
    });
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articleService.destroy(this.article.slug).subscribe((success) => {
      this.router.navigateByUrl('/');
    });
  }

  populateComments() {
    this.commentService.getAll(this.article.slug).subscribe((comments) => {
      this.comments = comments;
      this.cdRef.markForCheck();
    });
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = { errors: {} };

    const commentBody = this.commentControl.value;
    this.commentService.add(this.article.slug, commentBody).subscribe(
      (comment) => {
        this.comments.unshift(comment);
        this.commentControl.reset('');
        this.isSubmitting = false;
        this.cdRef.markForCheck();
      },
      (errors) => {
        this.isSubmitting = false;
        this.commentFormErrors = errors;
        this.cdRef.markForCheck();
      }
    );
  }

  onDeleteComment(comment: Comment) {
    this.commentService.destroy(comment.id, this.article.slug).subscribe((success) => {
      this.comments = this.comments.filter((item) => item !== comment);
      this.cdRef.markForCheck();
    });
  }
}
