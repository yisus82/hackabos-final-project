import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaInfosComponent } from './components/media-infos/media-infos.component';
import { MediaInfoDetailsComponent } from './components/media-info-details/media-info-details.component';

const routes: Routes = [
  {
    path: 'infos',
    redirectTo: '/infos/list/1',
    pathMatch: 'full'
  },
  {
    path: 'infos/list',
    redirectTo: '/infos/list/1',
    pathMatch: 'full'
  },
  {
    path: 'infos/list/:page',
    component: MediaInfosComponent
  },
  {
    path: 'infos/:id',
    component: MediaInfoDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MediaInfosRoutingModule {}
