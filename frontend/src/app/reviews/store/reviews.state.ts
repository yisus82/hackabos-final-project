import { Action, State, Store, StateContext, Selector } from '@ngxs/store';
import { Reviews } from '../reviews.models';
import {
  GetReview,
  GetReviewSuccess,
  GetReviewFailed,
  GetReviews,
  GetReviewsSuccess,
  GetReviewsFailed,
  GetReviewsByMediaInfo,
  GetReviewsByMediaInfoSuccess,
  GetReviewsByMediaInfoFailed,
  GetReviewsByUsername,
  GetReviewsByUsernameSuccess,
  GetReviewsByUsernameFailed,
  AddComment,
  AddCommentSuccess,
  AddCommentFailed
} from './reviews.actions';
import { ReviewsService } from '../services/reviews.service';
import { tap, catchError } from 'rxjs/operators';
import { SetError } from '../../error/store/error.actions';

@State<Reviews>({
  name: 'reviews',
  defaults: {
    reviewsInfo: {
      docs: [],
      totalDocs: 0,
      limit: 0,
      hasPrevPage: false,
      hasNextPage: false,
      page: 0,
      totalPages: 0,
      pagingCounter: 0,
      prevPage: 0,
      nextPage: 0
    },
    reviewDetails: {
      _id: '',
      title: '',
      text: '',
      author: '',
      mediaInfo: null,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
})
export class ReviewsState {
  constructor(private store: Store, private reviewsService: ReviewsService) {}

  @Selector()
  static getReviewDetails({ reviewDetails }: Reviews) {
    return reviewDetails;
  }

  @Selector()
  static getReviews({ reviewsInfo }: Reviews) {
    return reviewsInfo;
  }

  @Action(GetReview)
  getReview({ dispatch }: StateContext<Reviews>, { id }: GetReview) {
    return this.reviewsService.getReview(id).pipe(
      tap(reviewResponse => dispatch(new GetReviewSuccess(reviewResponse))),
      catchError(error => dispatch(new GetReviewFailed(error.error)))
    );
  }

  @Action(GetReviewSuccess)
  getReviewSuccess({ patchState }: StateContext<Reviews>, reviewDetails: GetReviewSuccess) {
    patchState({ ...reviewDetails });
  }

  @Action(GetReviews)
  getReviews({ dispatch }: StateContext<Reviews>, { page }: GetReviews) {
    return this.reviewsService.getReviews(page).pipe(
      tap(reviewsResponse => dispatch(new GetReviewsSuccess(reviewsResponse))),
      catchError(error => dispatch(new GetReviewsFailed(error.error)))
    );
  }

  @Action(GetReviewsSuccess)
  getReviewsSuccess({ patchState }: StateContext<Reviews>, reviewsInfo: GetReviewSuccess) {
    patchState({ ...reviewsInfo });
  }

  @Action(GetReviewsByMediaInfo)
  getReviewsByMediaInfo(
    { dispatch }: StateContext<Reviews>,
    { page, mediaInfoId }: GetReviewsByMediaInfo
  ) {
    return this.reviewsService.getReviewsByMediaInfo(page, mediaInfoId).pipe(
      tap(reviewsResponse => dispatch(new GetReviewsByMediaInfoSuccess(reviewsResponse))),
      catchError(error => dispatch(new GetReviewsByMediaInfoFailed(error.error)))
    );
  }

  @Action(GetReviewsByMediaInfoSuccess)
  getReviewsByMediaInfoSuccess(
    { patchState }: StateContext<Reviews>,
    reviewsInfo: GetReviewSuccess
  ) {
    patchState({ ...reviewsInfo });
  }

  @Action(GetReviewsByUsername)
  getReviewsByUsername(
    { dispatch }: StateContext<Reviews>,
    { page, username }: GetReviewsByUsername
  ) {
    return this.reviewsService.getReviewsByUsername(page, username).pipe(
      tap(reviewsResponse => dispatch(new GetReviewsByUsernameSuccess(reviewsResponse))),
      catchError(error => dispatch(new GetReviewsByUsernameFailed(error.error)))
    );
  }

  @Action(GetReviewsByUsernameSuccess)
  getReviewsByUsernameSuccess(
    { patchState }: StateContext<Reviews>,
    reviewsInfo: GetReviewSuccess
  ) {
    patchState({ ...reviewsInfo });
  }

  @Action(AddComment)
  addComment({ dispatch }: StateContext<Reviews>, { reviewId, comment }: AddComment) {
    return this.reviewsService.addComment(reviewId, comment.text).pipe(
      tap(() => dispatch(new AddCommentSuccess(reviewId))),
      catchError(error => dispatch(new AddCommentFailed(error.error)))
    );
  }

  @Action(AddCommentSuccess)
  addCommentSucess({ dispatch }: StateContext<Reviews>, { reviewId }: AddCommentSuccess) {
    dispatch(new GetReview(reviewId));
  }

  @Action([
    GetReviewFailed,
    GetReviewsFailed,
    GetReviewsByMediaInfoFailed,
    GetReviewsByUsernameFailed,
    AddCommentFailed
  ])
  error({ dispatch }: StateContext<Reviews>, { error }: any) {
    if (error && error.message) {
      dispatch(new SetError(error));
    } else {
      dispatch(new SetError({ message: error }));
    }
  }
}
