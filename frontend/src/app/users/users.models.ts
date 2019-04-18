export interface Users {
  usersInfo: UsersInfo;
  userDetails: UserDetails;
}

export interface UserDetails {
  _id: string;
  role: string;
  email: string;
  password: string;
  username: string;
  avatarURL?: string;
  verificationCode: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersInfo {
  docs: UserDetails[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  totalPages: number;
  pagingCounter: number;
  prevPage?: number;
  nextPage?: number;
}
