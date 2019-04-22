import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';
import { CreateReviewSuccess, CreateReview } from '../../store/media-infos.actions';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {
  @Input() mediaInfoID: string;
  reviewForm = this.fb.group(
    {
      title: ['', [Validators.required]],
      text: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store, private actions$: Actions) {}

  ngOnInit() {
    this.actions$.pipe(ofAction(CreateReviewSuccess)).subscribe(() => this.reviewForm.reset());
  }

  createReview() {
    if (!this.reviewForm.valid) {
      this.markFormGroupAsTouched(this.reviewForm);
      return;
    }
    this.store.dispatch(
      new CreateReview({ mediaInfo: this.mediaInfoID, ...this.reviewForm.value })
    );
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => control.markAsTouched());
  }
}
