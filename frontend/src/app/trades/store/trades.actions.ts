import { Error } from '../../error/error.models';
import { TradeDetails, TradesInfo, Offer, OfferRequest } from '../trades.models';

export class GetTrade {
  static readonly type = '[Trades] GetTrade';
  constructor(public id: string) {}
}

export class GetTradeSuccess {
  static readonly type = '[Trades] GetTradeSuccess';
  constructor(public tradeDetails: TradeDetails) {}
}

export class GetTradeFailed {
  static type = '[Trades] GetTradeFailed';
  constructor(public error: Error) {}
}

export class GetTrades {
  static readonly type = '[Trades] GetTrades';
  constructor(public page: number) {}
}

export class GetTradesSuccess {
  static readonly type = '[Trades] GetTradesSuccess';
  constructor(public tradesInfo: TradesInfo) {}
}

export class GetTradesFailed {
  static type = '[Trades] GetTradesFailed';
  constructor(public error: Error) {}
}

export class GetTradesByUsername {
  static readonly type = '[Trades] GetTradesByUsername';
  constructor(public page: number, public username: string) {}
}

export class GetTradesByUsernameSuccess {
  static readonly type = '[Trades] GetTradesByUsernameSuccess';
  constructor(public tradesInfo: TradesInfo) {}
}

export class GetTradesByUsernameFailed {
  static type = '[Trades] GetTradesByUsernameFailed';
  constructor(public error: Error) {}
}

export class AddOffer {
  static readonly type = '[Trades] AddOffer';
  constructor(public offer: OfferRequest, public tradeId: string) {}
}

export class AddOfferSuccess {
  static readonly type = '[Trades] AddOfferSuccess';
  constructor(public tradeId: string) {}
}

export class AddOfferFailed {
  static type = '[Trades] AddOfferFailed';
  constructor(public error: Error) {}
}
