import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLayoutFooterComponent } from './site-layout-footer.component';

describe('SiteLayoutFooterComponent', () => {
  let component: SiteLayoutFooterComponent;
  let fixture: ComponentFixture<SiteLayoutFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteLayoutFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
