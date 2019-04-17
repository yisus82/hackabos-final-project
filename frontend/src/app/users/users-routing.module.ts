import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'users/login',
    component: LoginComponent
  },
  {
    path: 'users/register',
    component: RegisterComponent
  },
  {
    path: 'users/account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
