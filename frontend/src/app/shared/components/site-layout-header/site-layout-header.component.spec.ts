import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLayoutHeaderComponent } from './site-layout-header.component';

describe('SiteLayoutHeaderComponent', () => {
  let component: SiteLayoutHeaderComponent;
  let fixture: ComponentFixture<SiteLayoutHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteLayoutHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
