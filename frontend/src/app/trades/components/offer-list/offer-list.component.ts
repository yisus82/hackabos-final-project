import { Component, Input } from '@angular/core';
import { Offer } from '../../trades.models';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent {
  @Input() offers: Offer[];
}
