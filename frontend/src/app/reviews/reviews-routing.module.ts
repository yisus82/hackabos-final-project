import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AuthGuard } from '../users/services/auth.guard';
import { ReviewDetailsComponent } from './components/review-details/review-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/reviews/list/1',
    pathMatch: 'full'
  },
  {
    path: 'reviews',
    redirectTo: '/reviews/list/1',
    pathMatch: 'full'
  },
  {
    path: 'reviews/list',
    redirectTo: '/reviews/list/1',
    pathMatch: 'full'
  },
  {
    path: 'reviews/list/:page',
    component: ReviewsComponent
  },
  {
    path: 'reviews/user/:username',
    redirectTo: '/reviews/user/:username/list/1',
    pathMatch: 'full'
  },
  {
    path: 'reviews/user/:username/list',
    redirectTo: '/reviews/user/:username/list/1',
    pathMatch: 'full'
  },
  {
    path: 'reviews/user/:username/list/:page',
    component: ReviewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews/media/:mediaInfo',
    redirectTo: '/reviews/media/:mediaInfo/list/1',
    pathMatch: 'full'
  },
  {
    path: 'reviews/media/:mediaInfo/list',
    redirectTo: '/reviews/media/:mediaInfo/list/1',
    pathMatch: 'full'
  },
  {
    path: 'reviews/media/:mediaInfo/list/:page',
    component: ReviewsComponent
  },
  {
    path: 'reviews/:id',
    component: ReviewDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule {}
