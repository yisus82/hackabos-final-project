import { State, Store, StateContext, Action } from '@ngxs/store';
import { Auth } from '../../auth.models';
import { AuthService } from '../../services/auth.service';
import {
  Login,
  LoginSuccess,
  LoginFailed,
  RegisterFailed,
  Register,
  RegisterSuccess,
  Logout,
  ChangePasswordSuccess,
  ChangePasswordFailed,
  ChangePassword,
  ChangeAvatarFailed,
  ChangeAvatarSuccess
} from './auth.actions';
import { Navigate } from '@ngxs/router-plugin';
import { tap, catchError } from 'rxjs/operators';
import { SetError } from '../../../error/store/error.actions';

@State<Auth>({
  name: 'auth',
  defaults: {
    ...JSON.parse(localStorage.getItem('auth'))
  }
})
export class AuthState {
  constructor(private store: Store, private authService: AuthService) {}

  @Action(Login, { cancelUncompleted: true })
  login({ dispatch }: StateContext<Auth>, action: Login) {
    return this.authService.login(action.login).pipe(
      tap(data => dispatch(new LoginSuccess(data))),
      catchError(error => dispatch(new LoginFailed(error.error)))
    );
  }

  @Action(LoginSuccess)
  loginSuccess({ patchState, dispatch }: StateContext<Auth>, { loginResponse }: LoginSuccess) {
    patchState({ ...loginResponse });
    dispatch(new Navigate(['/reviews/list/1']));
  }

  @Action(Logout)
  logout({ setState, dispatch }: StateContext<Auth>) {
    this.authService.logout();
    setState(null);
  }

  @Action(Register)
  register({ dispatch }: StateContext<Auth>, action: Register) {
    return this.authService.register(action.register).pipe(
      tap(() => dispatch(new RegisterSuccess())),
      catchError(error => dispatch(new RegisterFailed(error.error)))
    );
  }

  @Action(RegisterSuccess)
  registerSuccess({ setState, dispatch }: StateContext<Auth>) {
    this.authService.logout();
    setState(null);
    dispatch(new Navigate(['/users/login']));
  }

  @Action(ChangePassword, { cancelUncompleted: true })
  changePassword({ dispatch }: StateContext<Auth>, action: ChangePassword) {
    return this.authService.changePassword(action.password).pipe(
      tap(() => dispatch(new ChangePasswordSuccess())),
      catchError(error => dispatch(new ChangePasswordFailed(error.error)))
    );
  }

  @Action(ChangePasswordSuccess)
  changePasswordSuccess(ctx: StateContext<Auth>) {}

  @Action(ChangeAvatarSuccess)
  changeAvatarSuccess({ patchState }: StateContext<Auth>, { avatarURL }: ChangeAvatarSuccess) {
    patchState({ avatarURL });
  }

  @Action([LoginFailed, RegisterFailed, ChangePasswordFailed, ChangeAvatarFailed])
  error({ dispatch }: StateContext<Auth>, { error }: any) {
    dispatch(new SetError(error));
  }
}
