import { State, Action, StateContext } from '@ngxs/store';
import { SetErrors, ResetErrors } from './errors.actions';
import { Error } from '../errors.models';

@State<Error[]>({
  name: 'errors',
  defaults: []
})
export class ErrorState {
  @Action(SetErrors)
  setErrors({ setState }: StateContext<Error[]>, { errors }: SetErrors) {
    setState(errors);
  }

  @Action(ResetErrors)
  resetErrors({ setState }: StateContext<Error[]>) {
    setState([]);
  }
}
