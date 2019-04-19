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
    path: 'reviews/list/:page',
    component: ReviewsComponent
  },
  {
    path: 'reviews/:username/list/:page',
    component: ReviewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews/:mediaInfo/list/:page',
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
