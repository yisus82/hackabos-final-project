import { Injectable } from '@angular/core';
import { UserDetails } from '../users.models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserProfile(username: string) {
    return this.http.get<UserDetails>(`${environment.apiBaseUrl}/users?username=${username}`);
  }
}
