import { Injectable } from '@angular/core';
import { MediaInfoDetails, MediaInfosInfo } from '../media-infos.models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaInfosService {
  constructor(private http: HttpClient) {}

  getMediaInfo(id: string) {
    return this.http.get<MediaInfoDetails>(`${environment.apiBaseUrl}/infos?id=${id}`);
  }

  getMediaInfos(page: number) {
    return this.http.get<MediaInfosInfo>(
      `${environment.apiBaseUrl}/infos/list?page=${page}&limit=10`
    );
  }

  createReview(mediaInfoID: string, title: string, text: string) {
    return this.http.post(`${environment.apiBaseUrl}/reviews`, {
      title,
      text,
      mediaInfo: mediaInfoID
    });
  }
}
