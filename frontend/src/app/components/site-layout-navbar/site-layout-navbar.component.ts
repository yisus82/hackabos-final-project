import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-site-layout-navbar',
  templateUrl: './site-layout-navbar.component.html',
  styleUrls: ['./site-layout-navbar.component.scss']
})
export class SiteLayoutNavbarComponent {
  user;
  logoMenu = faBars;
  display = 'block';

  toggleMenu() {
    if (this.display === 'block') {
      this.display = 'none';
    } else {
      this.display = 'block';
    }
  }
}
