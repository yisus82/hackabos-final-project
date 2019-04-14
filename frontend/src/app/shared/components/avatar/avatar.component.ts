import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() user;
  imageURL;

  ngOnInit() {
    if (this.user) {
      this.imageURL = this.user.avatarURL || '/assets/img/avatar.png';
    } else {
      this.imageURL = '/assets/img/avatar.png';
    }
  }
}
