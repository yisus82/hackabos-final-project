import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradesComponent } from './components/trades/trades.component';
import { AuthGuard } from '../users/services/auth.guard';
import { TradeDetailsComponent } from './components/trade-details/trade-details.component';

const routes: Routes = [
  {
    path: 'trades',
    redirectTo: '/trades/list/1',
    pathMatch: 'full'
  },
  {
    path: 'trades/list',
    redirectTo: '/trades/list/1',
    pathMatch: 'full'
  },
  {
    path: 'trades/list/:page',
    component: TradesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trades/user/:username',
    redirectTo: '/trades/user/:username/list/1',
    pathMatch: 'full'
  },
  {
    path: 'trades/user/:username/list',
    redirectTo: '/trades/user/:username/list/1',
    pathMatch: 'full'
  },
  {
    path: 'trades/user/:username/list/:page',
    component: TradesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trades/:id',
    component: TradeDetailsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TradesRoutingModule {}
