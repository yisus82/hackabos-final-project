import { LoginRequest, LoginResponse, RegisterRequest, User } from '../auth.models';
import { Error } from '../../error/error.models';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public login: LoginRequest) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] LoginSuccess';
  constructor(public loginResponse: LoginResponse) {}
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public error: Error) {}
}

export class Logout {
  static type = '[Auth] Logout';
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public register: RegisterRequest) {}
}

export class RegisterSuccess {
  static readonly type = '[Auth] RegisterSuccess';
}

export class RegisterFailed {
  static type = '[Auth] RegisterFailed';
  constructor(public error: Error) {}
}

export class GetUserProfile {
  static readonly type = '[Auth] GetUserProfile';
}

export class GetUserProfileSuccess {
  static readonly type = '[Auth] GetUserProfileSuccess';
  constructor(public profile: User) {}
}

export class GetUserProfileFailed {
  static type = '[Auth] GetUserProfileFailed';
  constructor(public error: Error) {}
}

export class ChangePassword {
  static readonly type = '[Auth] ChangePassword';
  constructor(public password: string) {}
}

export class ChangePasswordSuccess {
  static readonly type = '[Auth] ChangePasswordSuccess';
}

export class ChangePasswordFailed {
  static type = '[Auth] ChangePasswordFailed';
  constructor(public error: Error) {}
}
