export interface Users {
  users: UserDetails[];
  userDetails: UserDetails;
}

export interface UserDetails {
  email: string;
  username: string;
  avatarURL: string;
}
