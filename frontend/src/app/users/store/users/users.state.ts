import { Action, State, Store, StateContext, Selector } from '@ngxs/store';
import { Users } from '../../users.models';
import { GetUserProfile, GetUserProfileSuccess, GetUserProfileFailed } from './users.actions';
import { UsersService } from '../../services/users.service';
import { tap, catchError } from 'rxjs/operators';
import { SetError } from '../../../error/store/error.actions';

@State<Users>({
  name: 'users',
  defaults: {
    users: [],
    userDetails: {
      email: '',
      avatarURL: '',
      username: ''
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
  static getUsers({ users }: Users) {
    return users;
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

  @Action([GetUserProfileFailed])
  error({ dispatch }: StateContext<Users>, { error }: any) {
    if (error && error.message) {
      dispatch(new SetError(error));
    } else {
      dispatch(new SetError({ message: error }));
    }
  }
}
