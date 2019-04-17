export interface Auth {
  email: string;
  username: string;
  avatarURL: string;
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
  avatarURL: string;
  role: string;
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface PasswordRequest {
  password: string;
}
