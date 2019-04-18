import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './components/avatar/avatar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormComponent } from './components/form/form.component';
import { InfoMessageComponent } from './components/info-message/info-message.component';

@NgModule({
  declarations: [
    AvatarComponent,
    PageNotFoundComponent,
    FormControlComponent,
    FormComponent,
    InfoMessageComponent
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [
    AvatarComponent,
    PageNotFoundComponent,
    FormControlComponent,
    FormComponent,
    InfoMessageComponent
  ]
})
export class SharedModule {}