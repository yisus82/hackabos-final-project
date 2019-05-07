import { Error } from '../../error/error.models';
import { MediaInfoDetails, MediaInfosInfo } from '../media-infos.models';
import { ReviewDetails, ReviewRequest } from 'src/app/reviews/reviews.models';

export class GetMediaInfo {
  static readonly type = '[MediaInfos] GetMediaInfo';
  constructor(public id: string) {}
}

export class GetMediaInfoSuccess {
  static readonly type = '[MediaInfos] GetMediaInfoSuccess';
  constructor(public mediaInfoDetails: MediaInfoDetails) {}
}

export class GetMediaInfoFailed {
  static type = '[MediaInfos] GetMediaInfoFailed';
  constructor(public error: Error) {}
}

export class GetMediaInfos {
  static readonly type = '[MediaInfos] GetMediaInfos';
  constructor(public page: number) {}
}

export class GetMediaInfosSuccess {
  static readonly type = '[MediaInfos] GetMediaInfosSuccess';
  constructor(public mediaInfosInfo: MediaInfosInfo) {}
}

export class GetMediaInfosFailed {
  static type = '[MediaInfos] GetMediaInfosFailed';
  constructor(public error: Error) {}
}

export class CreateReview {
  static readonly type = '[MediaInfos] CreateReview';
  constructor(public review: ReviewRequest) {}
}

export class CreateReviewSuccess {
  static readonly type = '[MediaInfos] CreateReviewSuccess';
  constructor(public mediaInfoId: string) {}
}

export class CreateReviewFailed {
  static type = '[MediaInfos] CreateReviewFailed';
  constructor(public error: Error) {}
}
