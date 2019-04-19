import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ReviewsState } from '../../store/reviews.state';
import { Observable } from 'rxjs';
import { ReviewDetails } from '../../reviews.models';
import { ActivatedRoute } from '@angular/router';
import { GetReview } from '../../store/reviews.actions';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss']
})
export class ReviewDetailsComponent implements OnInit {
  @Select(ReviewsState.getReviewDetails) reviewDetails$: Observable<ReviewDetails>;
  currentUser = this.store.selectSnapshot(state => state.auth);

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetReview(routeParams.id));
    });
  }

  reverseArray(arr: any[]) {
    return arr.map((item, idx) => arr[arr.length - 1 - idx]);
  }
}
