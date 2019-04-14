export interface User {
  email: string;
  username: string;
  avatarUrl: string;
  role: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  username: string;
  avatarUrl: string;
  role: string;
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
