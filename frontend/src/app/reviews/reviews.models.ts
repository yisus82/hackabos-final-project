export interface Reviews {
  reviewsInfo: ReviewsInfo;
  reviewDetails: ReviewDetails;
}

export interface Comment {
  _id: string;
  text: string;
  author: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ReviewDetails {
  _id: string;
  title: string;
  text: string;
  author: string;
  mediaInfo: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewsInfo {
  docs: ReviewDetails[];
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
