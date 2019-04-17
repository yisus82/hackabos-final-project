import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Auth } from '../../auth.models';
import { UserDetails } from '../../users.models';
import { UsersState } from '../../store/users/users.state';
import { ActivatedRoute } from '@angular/router';
import { GetUserProfile } from '../../store/users/users.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Select(UsersState.getUserDetails) userDetails$: Observable<UserDetails>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetUserProfile(routeParams.username));
    });
  }
}
