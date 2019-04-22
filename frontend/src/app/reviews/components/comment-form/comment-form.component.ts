import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, ofAction, Actions } from '@ngxs/store';
import { AddComment, AddCommentSuccess } from '../../store/reviews.actions';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() reviewID: string;
  commentForm = this.fb.group(
    {
      text: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store, private actions$: Actions) {}

  ngOnInit() {
    this.actions$.pipe(ofAction(AddCommentSuccess)).subscribe(() => this.commentForm.reset());
  }

  comment() {
    if (!this.commentForm.valid) {
      this.markFormGroupAsTouched(this.commentForm);
      return;
    }
    this.store.dispatch(new AddComment(this.commentForm.value, this.reviewID));
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => control.markAsTouched());
  }
}
