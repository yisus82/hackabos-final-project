import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCardsItemComponent } from './trade-cards-item.component';

describe('TradeCardsItemComponent', () => {
  let component: TradeCardsItemComponent;
  let fixture: ComponentFixture<TradeCardsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCardsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCardsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
