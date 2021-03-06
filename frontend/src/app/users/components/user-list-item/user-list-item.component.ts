import { Component, Input } from '@angular/core';
import { UserDetails } from '../../users.models';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent {
  @Input() user: UserDetails;
}
