import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { ReviewsState } from '../../store/reviews.state';
import { ReviewsInfo } from '../../reviews.models';
import { Observable } from 'rxjs';
import {
  GetReviews,
  GetReviewsByMediaInfo,
  GetReviewsByUsername
} from '../../store/reviews.actions';

@Component({
  selector: 'app-users',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Select(ReviewsState.getReviews) reviewsInfo$: Observable<ReviewsInfo>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.username) {
        this.store.dispatch(new GetReviewsByUsername(routeParams.page, routeParams.username));
      } else if (routeParams.mediaInfo) {
        this.store.dispatch(new GetReviewsByMediaInfo(routeParams.page, routeParams.mediaInfo));
      } else {
        this.store.dispatch(new GetReviews(routeParams.page));
      }
    });
  }
}
