import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutHeaderComponent } from './components/site-layout-header/site-layout-header.component';
import { SiteLayoutFooterComponent } from './components/site-layout-footer/site-layout-footer.component';
import { SiteLayoutNavbarComponent } from './components/site-layout-navbar/site-layout-navbar.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormControlComponent } from './components/form-control/form-control.component';

@NgModule({
  declarations: [
    SiteLayoutHeaderComponent,
    SiteLayoutFooterComponent,
    SiteLayoutNavbarComponent,
    AvatarComponent,
    PageNotFoundComponent,
    FormControlComponent
  ],
  imports: [CommonModule],
  exports: [
    SiteLayoutHeaderComponent,
    SiteLayoutFooterComponent,
    SiteLayoutNavbarComponent,
    AvatarComponent,
    PageNotFoundComponent,
    FormControlComponent
  ]
})
export class SharedModule {}
