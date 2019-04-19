export interface Trades {
  tradesInfo: TradesInfo;
  tradeDetails: TradeDetails;
}

export interface Offer {
  _id: string;
  text: string;
  author: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface TradeDetails {
  _id: string;
  title: string;
  text: string;
  author: string;
  offers: Offer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TradesInfo {
  docs: TradeDetails[];
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

export interface OfferRequest {
  text: string;
}
