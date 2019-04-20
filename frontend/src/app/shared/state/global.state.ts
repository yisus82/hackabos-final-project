import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Global } from '../shared.models';
import {
  Login,
  Register,
  ChangePassword,
  LoginSuccess,
  RegisterSuccess,
  ChangePasswordSuccess,
  LoginFailed,
  RegisterFailed,
  ChangePasswordFailed
} from 'src/app/users/store/auth/auth.actions';
import {
  GetUserProfile,
  GetUsers,
  GetUserProfileSuccess,
  GetUsersSuccess,
  GetUserProfileFailed,
  GetUsersFailed
} from 'src/app/users/store/users/users.actions';
import {
  GetReview,
  GetReviews,
  GetReviewsByMediaInfo,
  GetReviewsByUsername,
  AddComment,
  GetReviewSuccess,
  GetReviewsSuccess,
  GetReviewsByMediaInfoSuccess,
  GetReviewsByUsernameSuccess,
  AddCommentSuccess,
  GetReviewFailed,
  GetReviewsFailed,
  GetReviewsByMediaInfoFailed,
  GetReviewsByUsernameFailed,
  AddCommentFailed
} from 'src/app/reviews/store/reviews.actions';
import {
  GetMediaInfo,
  GetMediaInfos,
  CreateReview,
  GetMediaInfoSuccess,
  GetMediaInfosSuccess,
  CreateReviewSuccess,
  GetMediaInfoFailed,
  GetMediaInfosFailed,
  CreateReviewFailed
} from 'src/app/media-infos/store/media-infos.actions';
import {
  GetTrade,
  GetTrades,
  GetTradesByUsername,
  AddOffer,
  CreateTrade,
  GetTradeSuccess,
  GetTradesSuccess,
  GetTradesByUsernameSuccess,
  AddOfferSuccess,
  CreateTradeSuccess,
  GetTradeFailed,
  GetTradesFailed,
  GetTradesByUsernameFailed,
  AddOfferFailed,
  CreateTradeFailed
} from 'src/app/trades/store/trades.actions';

@State<Global>({
  name: 'global',
  defaults: {
    isFetching: false
  }
})
export class GlobalState {
  @Selector()
  static isFetching({ isFetching }: Global) {
    return isFetching;
  }

  @Action([
    Login,
    Register,
    ChangePassword,
    GetUserProfile,
    GetUsers,
    GetReview,
    GetReviews,
    GetReviewsByMediaInfo,
    GetReviewsByUsername,
    AddComment,
    GetMediaInfo,
    GetMediaInfos,
    CreateReview,
    GetTrade,
    GetTrades,
    GetTradesByUsername,
    AddOffer,
    CreateTrade
  ])
  startFetching({ patchState }: StateContext<Global>) {
    patchState({ isFetching: true });
  }

  @Action([
    LoginSuccess,
    RegisterSuccess,
    ChangePasswordSuccess,
    GetUserProfileSuccess,
    GetUsersSuccess,
    GetReviewSuccess,
    GetReviewsSuccess,
    GetReviewsByMediaInfoSuccess,
    GetReviewsByUsernameSuccess,
    AddCommentSuccess,
    GetMediaInfoSuccess,
    GetMediaInfosSuccess,
    CreateReviewSuccess,
    GetTradeSuccess,
    GetTradesSuccess,
    GetTradesByUsernameSuccess,
    AddOfferSuccess,
    CreateTradeSuccess,
    LoginFailed,
    RegisterFailed,
    ChangePasswordFailed,
    GetUserProfileFailed,
    GetUsersFailed,
    GetReviewFailed,
    GetReviewsFailed,
    GetReviewsByMediaInfoFailed,
    GetReviewsByUsernameFailed,
    AddCommentFailed,
    GetMediaInfoFailed,
    GetMediaInfosFailed,
    CreateReviewFailed,
    GetTradeFailed,
    GetTradesFailed,
    GetTradesByUsernameFailed,
    AddOfferFailed,
    CreateTradeFailed
  ])
  endFetching({ patchState }: StateContext<Global>) {
    patchState({ isFetching: false });
  }
}
