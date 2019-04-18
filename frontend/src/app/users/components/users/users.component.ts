import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { UsersState } from '../../store/users/users.state';
import { UsersInfo } from '../../users.models';
import { Observable } from 'rxjs';
import { GetUsers } from '../../store/users/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Select(UsersState.getUsers) usersInfo$: Observable<UsersInfo>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetUsers(routeParams.page));
    });
  }
}
