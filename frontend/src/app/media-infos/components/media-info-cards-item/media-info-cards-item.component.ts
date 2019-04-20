import { Component, Input } from '@angular/core';
import { MediaInfoDetails } from '../../media-infos.models';

@Component({
  selector: 'app-media-info-cards-item',
  templateUrl: './media-info-cards-item.component.html',
  styleUrls: ['./media-info-cards-item.component.scss']
})
export class MediaInfoCardsItemComponent {
  @Input() mediaInfo: MediaInfoDetails;
}
