import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewCardsComponent } from './components/review-cards/review-cards.component';
import { ReviewCardsItemComponent } from './components/review-cards-item/review-cards-item.component';
import { ReviewDetailsComponent } from './components/review-details/review-details.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorsModule } from '../error/error.module';
import { NgxsModule } from '@ngxs/store';
import { ReviewsState } from './store/reviews.state';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [
    ReviewsComponent,
    ReviewCardsComponent,
    ReviewCardsItemComponent,
    ReviewDetailsComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ErrorsModule,
    ReviewsRoutingModule,
    NgxsModule.forFeature([ReviewsState])
  ]
})
export class ReviewsModule {}
