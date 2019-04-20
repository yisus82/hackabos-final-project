import { Component, Input } from '@angular/core';
import { TradeDetails } from '../../trades.models';

@Component({
  selector: 'app-trade-cards-item',
  templateUrl: './trade-cards-item.component.html',
  styleUrls: ['./trade-cards-item.component.scss']
})
export class TradeCardsItemComponent {
  @Input() trade: TradeDetails;
}
