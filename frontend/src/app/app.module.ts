import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SiteLayoutHeaderComponent } from './components/site-layout-header/site-layout-header.component';
import { SiteLayoutFooterComponent } from './components/site-layout-footer/site-layout-footer.component';
import { SiteLayoutNavbarComponent } from './components/site-layout-navbar/site-layout-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutHeaderComponent,
    SiteLayoutFooterComponent,
    SiteLayoutNavbarComponent
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
