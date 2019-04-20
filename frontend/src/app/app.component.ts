import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { GlobalState } from './shared/state/global.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(GlobalState.isFetching) isFetching$: Observable<boolean>;
}
