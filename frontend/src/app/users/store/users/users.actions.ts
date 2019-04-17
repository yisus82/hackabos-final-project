import { Error } from '../../../error/error.models';
import { UserDetails } from '../../users.models';

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
