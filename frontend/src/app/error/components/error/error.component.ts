import { Component, OnDestroy } from '@angular/core';
import { Error } from '../../error.models';
import { Store, Select } from '@ngxs/store';
import { ResetError } from '../../store/error.actions';
import { Observable } from 'rxjs';
import { ErrorState } from '../../store/error.state';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {
  @Select(ErrorState) error$: Observable<Error>;

  constructor(private store: Store) {}
  closeIcon = faTimesCircle;

  resetError() {
    this.store.dispatch(new ResetError());
  }

  getErrorMessage(error: Error) {
    if (error.message) {
      return `ERROR: ${error.message}`;
    } else {
      return `ERROR: ${error}`;
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetError());
  }
}
