import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInfoCardsComponent } from './media-info-cards.component';

describe('MediaInfoCardsComponent', () => {
  let component: MediaInfoCardsComponent;
  let fixture: ComponentFixture<MediaInfoCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaInfoCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
