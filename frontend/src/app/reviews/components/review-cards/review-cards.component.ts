import { Component, Input } from '@angular/core';
import { ReviewDetails } from '../../reviews.models';

@Component({
  selector: 'app-review-cards',
  templateUrl: './review-cards.component.html',
  styleUrls: ['./review-cards.component.scss']
})
export class ReviewCardsComponent {
  @Input() reviews: ReviewDetails[];
}
