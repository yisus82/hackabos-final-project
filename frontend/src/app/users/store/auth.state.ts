import { State, Store, StateContext, Action } from '@ngxs/store';
import { User } from '../auth.models';
import { AuthService } from '../services/auth.service';
import {
  Login,
  LoginSuccess,
  LoginFailed,
  RegisterFailed,
  Register,
  RegisterSuccess,
  GetUserProfileFailed,
  GetUserProfileSuccess,
  GetUserProfile,
  Logout,
  ChangePasswordSuccess,
  ChangePasswordFailed,
  ChangePassword,
  ChangeAvatarFailed,
  ChangeAvatarSuccess
} from './auth.actions';
import { Navigate } from '@ngxs/router-plugin';
import { tap, catchError } from 'rxjs/operators';
import { SetError } from '../../error/store/error.actions';

@State<User>({
  name: 'auth',
  defaults: {
    ...JSON.parse(localStorage.getItem('auth'))
  }
})
export class AuthState {
  constructor(private store: Store, private authService: AuthService) {}

  @Action(Login, { cancelUncompleted: true })
  login({ dispatch }: StateContext<User>, action: Login) {
    return this.authService.login(action.login).pipe(
      tap(data => dispatch(new LoginSuccess(data))),
      catchError(error => dispatch(new LoginFailed(error.error)))
    );
  }

  @Action(LoginSuccess)
  loginSuccess({ patchState, dispatch }: StateContext<User>, { loginResponse }: LoginSuccess) {
    patchState({ ...loginResponse });
    dispatch(new Navigate(['/reviews/list/1']));
  }

  @Action(Logout)
  logout({ setState, dispatch }: StateContext<User>) {
    this.authService.logout();
    setState(null);
    dispatch(new Navigate(['/reviews/list/1']));
  }

  @Action(Register)
  register({ dispatch }: StateContext<User>, action: Register) {
    return this.authService.register(action.register).pipe(
      tap(() => dispatch(new RegisterSuccess())),
      catchError(error => dispatch(new RegisterFailed(error.error)))
    );
  }

  @Action(RegisterSuccess)
  registerSuccess({ setState, dispatch }: StateContext<User>) {
    this.authService.logout();
    setState(null);
    dispatch(new Navigate(['/users/login']));
  }

  @Action(GetUserProfile)
  getUserProfile({ dispatch }: StateContext<User>) {
    return this.authService.getUserProfile().pipe(
      tap(profileResponse => dispatch(new GetUserProfileSuccess())),
      catchError(error => dispatch(new GetUserProfileFailed(error.error)))
    );
  }

  @Action(GetUserProfileSuccess)
  getUserProfileSuccess(ctx: StateContext<User>) {}

  @Action(ChangePassword, { cancelUncompleted: true })
  changePassword({ dispatch }: StateContext<User>, action: ChangePassword) {
    return this.authService.changePassword(action.password).pipe(
      tap(() => dispatch(new ChangePasswordSuccess())),
      catchError(error => dispatch(new ChangePasswordFailed(error.error)))
    );
  }

  @Action(ChangePasswordSuccess)
  changePasswordSuccess(ctx: StateContext<User>) {}

  @Action(ChangeAvatarSuccess)
  changeAvatarSuccess({ patchState }: StateContext<User>, { avatarURL }) {
    patchState({ avatarURL });
  }

  @Action([
    LoginFailed,
    RegisterFailed,
    GetUserProfileFailed,
    ChangePasswordFailed,
    ChangeAvatarFailed
  ])
  error({ dispatch }: StateContext<User>, { error }: any) {
    dispatch(new SetError(error));
  }
}
