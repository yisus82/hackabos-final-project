import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../../store/auth.state';
import { Observable } from 'rxjs';
import { User } from '../../auth.models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Select(AuthState) user$: Observable<User>;
  avatarURL: string;

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user && user.avatarURL) {
        this.avatarURL = user.avatarURL || '/assets/img/avatar.png';
      } else {
        this.avatarURL = '/assets/img/avatar.png';
      }
    });
  }
}
