import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaInfosRoutingModule } from './media-infos-routing.module';
import { MediaInfosComponent } from './components/media-infos/media-infos.component';
import { MediaInfoCardsComponent } from './components/media-info-cards/media-info-cards.component';
import { MediaInfoCardsItemComponent } from './components/media-info-cards-item/media-info-cards-item.component';
import { MediaInfoDetailsComponent } from './components/media-info-details/media-info-details.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorsModule } from '../error/error.module';
import { NgxsModule } from '@ngxs/store';
import { MediaInfosState } from './store/media-infos.state';

@NgModule({
  declarations: [
    MediaInfosComponent,
    MediaInfoCardsComponent,
    MediaInfoCardsItemComponent,
    MediaInfoDetailsComponent,
    ReviewFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ErrorsModule,
    MediaInfosRoutingModule,
    NgxsModule.forFeature([MediaInfosState])
  ]
})
export class MediaInfosModule {}
