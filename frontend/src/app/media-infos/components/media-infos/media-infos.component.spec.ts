import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInfosComponent } from './media-infos.component';

describe('MediaInfosComponent', () => {
  let component: MediaInfosComponent;
  let fixture: ComponentFixture<MediaInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
