import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInfoDetailsComponent } from './media-info-details.component';

describe('MediaInfoDetailsComponent', () => {
  let component: MediaInfoDetailsComponent;
  let fixture: ComponentFixture<MediaInfoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaInfoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
