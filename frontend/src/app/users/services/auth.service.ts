import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse, User } from '../auth.models';
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
            const { token } = user;
            localStorage.setItem('auth', JSON.stringify({ token }));
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

  getUserProfile() {
    return this.http.get<User>(`${environment.apiBaseUrl}/users`);
  }

  changePassword(password: string) {
    return this.http.patch<string>(`${environment.apiBaseUrl}/users/password`, password);
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
