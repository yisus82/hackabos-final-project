import { Component, OnDestroy } from '@angular/core';
import { Error } from '../../errors.models';
import { Store, Select } from '@ngxs/store';
import { ResetErrors } from '../../store/errors.actions';
import { Observable } from 'rxjs';
import { ErrorState } from '../../store/errors.state';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-errors',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {
  @Select(ErrorState) errors$: Observable<Error[]>;

  constructor(private store: Store) {}
  closeIcon = faTimesCircle;

  resetErrors() {
    this.store.dispatch(new ResetErrors());
  }

  getErrorMessage({ message }: Error) {
    return message;
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetErrors());
  }
}
