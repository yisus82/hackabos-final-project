import { Injectable } from '@angular/core';
import { ReviewDetails, ReviewsInfo } from '../reviews.models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private http: HttpClient) {}

  getReview(id: string) {
    return this.http.get<ReviewDetails>(`${environment.apiBaseUrl}/reviews?id=${id}`);
  }

  getReviewsByMediaInfo(page: number, mediaInfoId: string) {
    return this.http.get<ReviewsInfo>(
      `${environment.apiBaseUrl}/reviews/info?page=${page}&limit=10&mediaInfo=${mediaInfoId}`
    );
  }

  getReviewsByUsername(page: number, username: string) {
    return this.http.get<ReviewsInfo>(
      `${environment.apiBaseUrl}/reviews/user?page=${page}&limit=10&username=${username}`
    );
  }

  getReviews(page: number) {
    return this.http.get<ReviewsInfo>(
      `${environment.apiBaseUrl}/reviews/list?page=${page}&limit=10`
    );
  }
}
