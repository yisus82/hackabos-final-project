import { Component, Input } from '@angular/core';
import { UserDetails } from '../../users.models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: UserDetails[];
}
