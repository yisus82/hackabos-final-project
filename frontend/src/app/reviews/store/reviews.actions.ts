import { Error } from '../../error/error.models';
import { ReviewDetails, ReviewsInfo } from '../reviews.models';

export class GetReview {
  static readonly type = '[Reviews] GetReview';
  constructor(public id: string) {}
}

export class GetReviewSuccess {
  static readonly type = '[Reviews] GetReviewSuccess';
  constructor(public reviewDetails: ReviewDetails) {}
}

export class GetReviewFailed {
  static type = '[Reviews] GetReviewFailed';
  constructor(public error: Error) {}
}

export class GetReviews {
  static readonly type = '[Reviews] GetReviews';
  constructor(public page: number) {}
}

export class GetReviewsSuccess {
  static readonly type = '[Reviews] GetReviewsSuccess';
  constructor(public reviewsInfo: ReviewsInfo) {}
}

export class GetReviewsFailed {
  static type = '[Reviews] GetReviewsFailed';
  constructor(public error: Error) {}
}

export class GetReviewsByUsername {
  static readonly type = '[Reviews] GetReviewsByUsername';
  constructor(public page: number, public username: string) {}
}

export class GetReviewsByUsernameSuccess {
  static readonly type = '[Reviews] GetReviewsByUsernameSuccess';
  constructor(public reviewsInfo: ReviewsInfo) {}
}

export class GetReviewsByUsernameFailed {
  static type = '[Reviews] GetReviewsByUsernameFailed';
  constructor(public error: Error) {}
}

export class GetReviewsByMediaInfo {
  static readonly type = '[Reviews] GetReviewsByMediaInfo';
  constructor(public page: number, public mediaInfoId: string) {}
}

export class GetReviewsByMediaInfoSuccess {
  static readonly type = '[Reviews] GetReviewsByMediaInfoSuccess';
  constructor(public reviewsInfo: ReviewsInfo) {}
}

export class GetReviewsByMediaInfoFailed {
  static type = '[Reviews] GetReviewsByMediaInfoFailed';
  constructor(public error: Error) {}
}
