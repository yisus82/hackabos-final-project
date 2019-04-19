import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCardsItemComponent } from './review-cards-item.component';

describe('ReviewCardsItemComponent', () => {
  let component: ReviewCardsItemComponent;
  let fixture: ComponentFixture<ReviewCardsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewCardsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCardsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
