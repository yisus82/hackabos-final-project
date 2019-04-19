import { Component, Input } from '@angular/core';
import { ReviewDetails } from '../../reviews.models';

@Component({
  selector: 'app-review-cards-item',
  templateUrl: './review-cards-item.component.html',
  styleUrls: ['./review-cards-item.component.scss']
})
export class ReviewCardsItemComponent {
  @Input() review: ReviewDetails;
}
