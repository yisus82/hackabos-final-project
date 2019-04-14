import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './components/avatar/avatar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormControlComponent } from './components/form-control/form-control.component';

@NgModule({
  declarations: [AvatarComponent, PageNotFoundComponent, FormControlComponent],
  imports: [CommonModule],
  exports: [AvatarComponent, PageNotFoundComponent, FormControlComponent]
})
export class SharedModule {}
