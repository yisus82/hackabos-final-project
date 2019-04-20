import { Component, Input } from '@angular/core';
import { TradeDetails } from '../../trades.models';

@Component({
  selector: 'app-trade-cards',
  templateUrl: './trade-cards.component.html',
  styleUrls: ['./trade-cards.component.scss']
})
export class TradeCardsComponent {
  @Input() trades: TradeDetails[];
}
