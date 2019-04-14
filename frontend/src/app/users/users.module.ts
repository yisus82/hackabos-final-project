import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './components/login/login.component';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth.state';
import { SharedModule } from '../shared/shared.module';
import { ErrorsModule } from '../errors/errors.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './services/error.interceptor';
import { JwtInterceptor } from './services/jwt.interceptor';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ErrorsModule,
    UsersRoutingModule,
    NgxsModule.forFeature([AuthState])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class UsersModule {}
