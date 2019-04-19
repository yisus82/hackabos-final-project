import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../auth.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${environment.apiBaseUrl}/users/login`, {
        email,
        password
      })
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('auth', JSON.stringify({ ...user }));
          }
          return user;
        })
      );
  }

  register({ username, email, password }) {
    return this.http.post(`${environment.apiBaseUrl}/users`, {
      username,
      email,
      password
    });
  }

  changePassword({ password }) {
    return this.http.patch(`${environment.apiBaseUrl}/users/password`, { password });
  }

  changeAvatar(image: File) {
    const formData = new FormData();

    formData.append('avatar', image);

    return this.http.post(`${environment.apiBaseUrl}/users/avatar`, formData, {
      observe: 'response'
    });
  }

  logout() {
    localStorage.removeItem('auth');
  }
}
