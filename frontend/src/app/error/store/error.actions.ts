import { Error } from '../error.models';

export class SetError {
  static readonly type = '[Error] Set';
  constructor(public error: Error) {}
}

export class ResetError {
  static readonly type = '[Error] Reset';
}
