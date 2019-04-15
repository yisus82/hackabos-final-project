import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Store, Select } from '@ngxs/store';
import { Logout } from 'src/app/users/store/auth.actions';
import { AuthState } from 'src/app/users/store/auth.state';
import { User } from 'src/app/users/auth.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-layout-navbar',
  templateUrl: './site-layout-navbar.component.html',
  styleUrls: ['./site-layout-navbar.component.scss']
})
export class SiteLayoutNavbarComponent implements OnInit {
  @Select(AuthState) user$: Observable<User>;
  user;
  logoMenu = faBars;
  display = 'block';

  constructor(private store: Store) {}

  ngOnInit() {
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  toggleMenu() {
    if (this.display === 'block') {
      this.display = 'none';
    } else {
      this.display = 'block';
    }
  }
}
