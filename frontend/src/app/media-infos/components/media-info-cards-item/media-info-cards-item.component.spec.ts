import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInfoCardsItemComponent } from './media-info-cards-item.component';

describe('MediaInfoCardsItemComponent', () => {
  let component: MediaInfoCardsItemComponent;
  let fixture: ComponentFixture<MediaInfoCardsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaInfoCardsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInfoCardsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
