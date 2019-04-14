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
  ChangePassword
} from './auth.actions';
import { Navigate } from '@ngxs/router-plugin';
import { tap, catchError } from 'rxjs/operators';
import { SetErrors } from '../../errors/store/errors.actions';

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
  registerSuccess(ctx: StateContext<User>) {}

  @Action(GetUserProfile)
  getUserProfile({ dispatch }: StateContext<User>) {
    return this.authService.getUserProfile().pipe(
      tap(profileResponse => dispatch(new GetUserProfileSuccess(profileResponse))),
      catchError(error => dispatch(new GetUserProfileFailed(error.error)))
    );
  }

  @Action(GetUserProfileSuccess)
  getUserProfileSuccess({ patchState }: StateContext<User>, { profile }: GetUserProfileSuccess) {
    patchState({ ...profile });
  }

  @Action(ChangePassword, { cancelUncompleted: true })
  changePassword({ dispatch }: StateContext<User>, { password }: ChangePassword) {
    return this.authService.changePassword(password).pipe(
      tap(() => dispatch(new ChangePasswordSuccess())),
      catchError(error => dispatch(new ChangePasswordFailed(error.error)))
    );
  }

  @Action(ChangePasswordSuccess)
  changePasswordSuccess(ctx: StateContext<User>) {}

  @Action([LoginFailed, RegisterFailed, GetUserProfileFailed, ChangePasswordFailed])
  error({ dispatch }: StateContext<User>, { errors }: any) {
    dispatch(new SetErrors(errors));
  }
}
