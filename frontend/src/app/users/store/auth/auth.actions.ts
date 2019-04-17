import { LoginRequest, LoginResponse, RegisterRequest, PasswordRequest } from '../../auth.models';
import { Error } from '../../../error/error.models';

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

export class ChangePassword {
  static readonly type = '[Auth] ChangePassword';
  constructor(public password: PasswordRequest) {}
}

export class ChangePasswordSuccess {
  static readonly type = '[Auth] ChangePasswordSuccess';
}

export class ChangePasswordFailed {
  static type = '[Auth] ChangePasswordFailed';
  constructor(public error: Error) {}
}

export class ChangeAvatarSuccess {
  static readonly type = '[Auth] ChangeAvatarSuccess';
  constructor(public avatarURL: string) {}
}

export class ChangeAvatarFailed {
  static type = '[Auth] ChangeAvatarFailed';
  constructor(public error: Error) {}
}
