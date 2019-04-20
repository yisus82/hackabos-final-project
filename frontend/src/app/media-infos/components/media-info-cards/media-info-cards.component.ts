import { Component, Input } from '@angular/core';
import { MediaInfoDetails } from '../../media-infos.models';

@Component({
  selector: 'app-media-info-cards',
  templateUrl: './media-info-cards.component.html',
  styleUrls: ['./media-info-cards.component.scss']
})
export class MediaInfoCardsComponent {
  @Input() mediaInfos: MediaInfoDetails[];
}
