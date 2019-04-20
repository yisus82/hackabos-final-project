import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './components/avatar/avatar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormComponent } from './components/form/form.component';
import { InfoMessageComponent } from './components/info-message/info-message.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AvatarComponent,
    PageNotFoundComponent,
    FormControlComponent,
    FormComponent,
    InfoMessageComponent,
    PaginationComponent,
    LoaderComponent,
    TimeAgoPipe
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [
    AvatarComponent,
    PageNotFoundComponent,
    FormControlComponent,
    FormComponent,
    InfoMessageComponent,
    PaginationComponent,
    LoaderComponent,
    TimeAgoPipe
  ]
})
export class SharedModule {}
