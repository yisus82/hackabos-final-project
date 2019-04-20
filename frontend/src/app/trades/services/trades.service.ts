import { Injectable } from '@angular/core';
import { TradeDetails, TradesInfo, Offer } from '../trades.models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradesService {
  constructor(private http: HttpClient) {}

  getTrade(id: string) {
    return this.http.get<TradeDetails>(`${environment.apiBaseUrl}/trades?id=${id}`);
  }

  getTradesByUsername(page: number, username: string) {
    return this.http.get<TradesInfo>(
      `${environment.apiBaseUrl}/trades/user?page=${page}&limit=10&username=${username}`
    );
  }

  getTrades(page: number) {
    return this.http.get<TradesInfo>(`${environment.apiBaseUrl}/trades/list?page=${page}&limit=10`);
  }

  addOffer(tradeID: string, text: string) {
    return this.http.patch(`${environment.apiBaseUrl}/trades/offer`, {
      text,
      tradeID
    });
  }

  createTrade(title: string, text: string) {
    return this.http.post(`${environment.apiBaseUrl}/trades`, {
      title,
      text
    });
  }
}
