import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLayoutNavbarComponent } from './site-layout-navbar.component';

describe('SiteLayoutNavbarComponent', () => {
  let component: SiteLayoutNavbarComponent;
  let fixture: ComponentFixture<SiteLayoutNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteLayoutNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLayoutNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
