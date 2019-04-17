import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './components/login/login.component';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth/auth.state';
import { SharedModule } from '../shared/shared.module';
import { ErrorsModule } from '../error/error.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './services/error.interceptor';
import { JwtInterceptor } from './services/jwt.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { PasswordComponent } from './components/password/password.component';
import { AccountComponent } from './components/account/account.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersState } from './store/users/users.state';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FileUploadComponent,
    PasswordComponent,
    AccountComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ErrorsModule,
    UsersRoutingModule,
    NgxsModule.forFeature([AuthState, UsersState])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class UsersModule {}
