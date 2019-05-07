import { Action, State, Store, StateContext, Selector } from '@ngxs/store';
import { MediaInfos } from '../media-infos.models';
import {
  GetMediaInfo,
  GetMediaInfoSuccess,
  GetMediaInfoFailed,
  GetMediaInfos,
  GetMediaInfosSuccess,
  GetMediaInfosFailed,
  CreateReview,
  CreateReviewSuccess,
  CreateReviewFailed
} from './media-infos.actions';
import { MediaInfosService } from '../services/media-infos.service';
import { tap, catchError } from 'rxjs/operators';
import { SetError } from '../../error/store/error.actions';
import { GetReviewsByMediaInfo } from 'src/app/reviews/store/reviews.actions';
import { Navigate } from '@ngxs/router-plugin';

@State<MediaInfos>({
  name: 'mediaInfos',
  defaults: {
    mediaInfosInfo: {
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
    mediaInfoDetails: {
      _id: '',
      title: '',
      description: '',
      category: '',
      imageURL: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
})
export class MediaInfosState {
  constructor(private store: Store, private mediaInfosService: MediaInfosService) {}

  @Selector()
  static getMediaInfoDetails({ mediaInfoDetails }: MediaInfos) {
    return mediaInfoDetails;
  }

  @Selector()
  static getMediaInfos({ mediaInfosInfo }: MediaInfos) {
    return mediaInfosInfo;
  }

  @Action(GetMediaInfo)
  getMediaInfo({ dispatch }: StateContext<MediaInfos>, { id }: GetMediaInfo) {
    return this.mediaInfosService.getMediaInfo(id).pipe(
      tap(mediaInfoResponse => dispatch(new GetMediaInfoSuccess(mediaInfoResponse))),
      catchError(error => dispatch(new GetMediaInfoFailed(error.error)))
    );
  }

  @Action(GetMediaInfoSuccess)
  getMediaInfoSuccess(
    { dispatch, patchState }: StateContext<MediaInfos>,
    mediaInfoDetails: GetMediaInfoSuccess
  ) {
    patchState({ ...mediaInfoDetails });
    dispatch(new GetReviewsByMediaInfo(1, mediaInfoDetails.mediaInfoDetails._id));
  }

  @Action(GetMediaInfos)
  getMediaInfos({ dispatch }: StateContext<MediaInfos>, { page }: GetMediaInfos) {
    return this.mediaInfosService.getMediaInfos(page).pipe(
      tap(mediaInfosResponse => dispatch(new GetMediaInfosSuccess(mediaInfosResponse))),
      catchError(error => dispatch(new GetMediaInfosFailed(error.error)))
    );
  }

  @Action(GetMediaInfosSuccess)
  getMediaInfosSuccess(
    { patchState }: StateContext<MediaInfos>,
    mediaInfosInfo: GetMediaInfoSuccess
  ) {
    patchState({ ...mediaInfosInfo });
  }

  @Action(CreateReview)
  createReview({ dispatch }: StateContext<MediaInfos>, { review }: CreateReview) {
    return this.mediaInfosService.createReview(review.mediaInfo, review.title, review.text).pipe(
      tap(() => dispatch(new CreateReviewSuccess(review.mediaInfo))),
      catchError(error => dispatch(new CreateReviewFailed(error.error)))
    );
  }

  @Action(CreateReviewSuccess)
  createReviewSucess({ dispatch }: StateContext<MediaInfos>, { mediaInfoId }: CreateReviewSuccess) {
    dispatch(new Navigate(['reviews/media/' + mediaInfoId]));
  }

  @Action([GetMediaInfoFailed, GetMediaInfosFailed, CreateReviewFailed])
  error({ dispatch }: StateContext<MediaInfos>, { error }: any) {
    if (error && error.message) {
      dispatch(new SetError(error));
    } else {
      dispatch(new SetError({ message: error }));
    }
  }
}
