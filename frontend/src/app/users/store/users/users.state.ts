import { Action, State, Store, StateContext, Selector } from '@ngxs/store';
import { Users } from '../../users.models';
import {
  GetUserProfile,
  GetUserProfileSuccess,
  GetUserProfileFailed,
  GetUsersFailed,
  GetUsers,
  GetUsersSuccess
} from './users.actions';
import { UsersService } from '../../services/users.service';
import { tap, catchError } from 'rxjs/operators';
import { SetError } from '../../../error/store/error.actions';

@State<Users>({
  name: 'users',
  defaults: {
    usersInfo: {
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
    userDetails: {
      _id: '',
      role: '',
      email: '',
      password: '',
      username: '',
      avatarURL: '',
      verificationCode: '',
      verifiedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
})
export class UsersState {
  constructor(private store: Store, private usersService: UsersService) {}

  @Selector()
  static getUserDetails({ userDetails }: Users) {
    return userDetails;
  }

  @Selector()
  static getUsers({ usersInfo }: Users) {
    return usersInfo;
  }

  @Action(GetUserProfile)
  getUserProfile({ dispatch }: StateContext<Users>, { username }: GetUserProfile) {
    return this.usersService.getUserProfile(username).pipe(
      tap(profileResponse => dispatch(new GetUserProfileSuccess(profileResponse))),
      catchError(error => dispatch(new GetUserProfileFailed(error.error)))
    );
  }

  @Action(GetUserProfileSuccess)
  getUserProfileSuccess({ patchState }: StateContext<Users>, userDetails: GetUserProfileSuccess) {
    patchState({ ...userDetails });
  }

  @Action(GetUsers)
  getUsers({ dispatch }: StateContext<Users>, { page }: GetUsers) {
    return this.usersService.getUsers(page).pipe(
      tap(usersResponse => dispatch(new GetUsersSuccess(usersResponse))),
      catchError(error => dispatch(new GetUsersFailed(error.error)))
    );
  }

  @Action(GetUsersSuccess)
  getUsersSuccess({ patchState }: StateContext<Users>, usersInfo: GetUserProfileSuccess) {
    patchState({ ...usersInfo });
  }

  @Action([GetUserProfileFailed, GetUsersFailed])
  error({ dispatch }: StateContext<Users>, { error }: any) {
    if (error && error.message) {
      dispatch(new SetError(error));
    } else {
      dispatch(new SetError({ message: error }));
    }
  }
}
