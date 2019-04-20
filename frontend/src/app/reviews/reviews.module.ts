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
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentListItemComponent } from './components/comment-list-item/comment-list-item.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';

@NgModule({
  declarations: [
    ReviewsComponent,
    ReviewCardsComponent,
    ReviewCardsItemComponent,
    ReviewDetailsComponent,
    CommentListComponent,
    CommentListItemComponent,
    CommentFormComponent
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
