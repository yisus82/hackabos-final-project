import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SiteLayoutHeaderComponent } from './components/site-layout-header/site-layout-header.component';
import { SiteLayoutFooterComponent } from './components/site-layout-footer/site-layout-footer.component';
import { SiteLayoutNavbarComponent } from './components/site-layout-navbar/site-layout-navbar.component';
import { ReviewsRoutingModule } from './reviews/reviews-routing.module';
import { AboutRoutingModule } from './about/about-routing.module';
import { AboutModule } from './about/about.module';
import { UsersRoutingModule } from './users/users-routing.module';
import { UsersModule } from './users/users.module';
import { environment } from 'src/environments/environment';
import { ReviewsModule } from './reviews/reviews.module';
import { TradesRoutingModule } from './trades/trades-routing.module';
import { TradesModule } from './trades/trades.module';
import { MediaInfosModule } from './media-infos/media-infos.module';
import { MediaInfosRoutingModule } from './media-infos/media-infos-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutHeaderComponent,
    SiteLayoutFooterComponent,
    SiteLayoutNavbarComponent
  ],
  imports: [
    BrowserModule,
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false }),
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    FontAwesomeModule,
    SharedModule,
    ReviewsModule,
    MediaInfosModule,
    TradesModule,
    UsersModule,
    AboutModule,
    ReviewsRoutingModule,
    MediaInfosRoutingModule,
    TradesRoutingModule,
    UsersRoutingModule,
    AboutRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
