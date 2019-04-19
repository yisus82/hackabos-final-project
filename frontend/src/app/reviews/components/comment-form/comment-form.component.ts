import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddComment } from '../../store/reviews.actions';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
  @Input() reviewID: string;
  commentForm = this.fb.group(
    {
      text: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store) {}

  comment() {
    if (this.commentForm.valid) {
      this.store.dispatch(new AddComment(this.commentForm.value, this.reviewID));
    }
  }
}
