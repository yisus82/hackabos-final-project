import { Component, Input } from '@angular/core';
import { Comment } from '../../reviews.models';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss']
})
export class CommentListItemComponent {
  @Input() comment: Comment;
}
