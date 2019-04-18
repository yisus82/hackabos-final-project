import { Error } from '../../../error/error.models';
import { UserDetails, UsersInfo } from '../../users.models';

export class GetUserProfile {
  static readonly type = '[Users] GetUserProfile';
  constructor(public username: string) {}
}

export class GetUserProfileSuccess {
  static readonly type = '[Users] GetUserProfileSuccess';
  constructor(public userDetails: UserDetails) {}
}

export class GetUserProfileFailed {
  static type = '[Users] GetUserProfileFailed';
  constructor(public error: Error) {}
}

export class GetUsers {
  static readonly type = '[Users] GetUsers';
  constructor(public page: number) {}
}

export class GetUsersSuccess {
  static readonly type = '[Users] GetUsersSuccess';
  constructor(public usersInfo: UsersInfo) {}
}

export class GetUsersFailed {
  static type = '[Users] GetUsersFailed';
  constructor(public error: Error) {}
}
