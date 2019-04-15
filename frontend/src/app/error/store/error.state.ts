import { State, Action, StateContext } from '@ngxs/store';
import { SetError, ResetError } from './error.actions';
import { Error } from '../error.models';

@State<Error>({
  name: 'error',
  defaults: { message: '' }
})
export class ErrorState {
  @Action(SetError)
  setErrors({ setState }: StateContext<Error>, { error }: SetError) {
    setState({ message: error.message });
  }

  @Action(ResetError)
  resetErrors({ setState }: StateContext<Error>) {
    setState({ message: '' });
  }
}
