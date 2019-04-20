import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradesRoutingModule } from './trades-routing.module';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferListItemComponent } from './components/offer-list-item/offer-list-item.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { TradeCardsComponent } from './components/trade-cards/trade-cards.component';
import { TradeCardsItemComponent } from './components/trade-cards-item/trade-cards-item.component';
import { TradeDetailsComponent } from './components/trade-details/trade-details.component';
import { TradesComponent } from './components/trades/trades.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorsModule } from '../error/error.module';
import { NgxsModule } from '@ngxs/store';
import { TradesState } from './store/trades.state';
import { TradeFormComponent } from './components/trade-form/trade-form.component';

@NgModule({
  declarations: [
    OfferListComponent,
    OfferListItemComponent,
    OfferFormComponent,
    TradeCardsComponent,
    TradeCardsItemComponent,
    TradeDetailsComponent,
    TradesComponent,
    TradeFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ErrorsModule,
    TradesRoutingModule,
    NgxsModule.forFeature([TradesState])
  ]
})
export class TradesModule {}
