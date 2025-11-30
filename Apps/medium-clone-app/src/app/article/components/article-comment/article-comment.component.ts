import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { take } from 'rxjs';
import { Comment } from 'src/app/core/models/comment.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent implements OnInit {
  @Input() comment: Comment = {} as Comment;
  @Output() deleteCommentEventEmitter = new EventEmitter<boolean>();

  userService = inject(UserService);
  canModify = false;
  cdRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.userService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        this.canModify = user.username === this.comment.author.username;
        this.cdRef.markForCheck();
      },
    });
  }

  deleteClicked() {
    this.deleteCommentEventEmitter.emit(true);
  }
}
