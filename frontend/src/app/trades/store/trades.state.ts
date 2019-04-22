import { Action, State, Store, StateContext, Selector } from '@ngxs/store';
import { Trades } from '../trades.models';
import {
  GetTrade,
  GetTradeSuccess,
  GetTradeFailed,
  GetTrades,
  GetTradesSuccess,
  GetTradesFailed,
  GetTradesByUsername,
  GetTradesByUsernameSuccess,
  GetTradesByUsernameFailed,
  AddOffer,
  AddOfferSuccess,
  AddOfferFailed,
  CreateTrade,
  CreateTradeSuccess,
  CreateTradeFailed
} from './trades.actions';
import { TradesService } from '../services/trades.service';
import { tap, catchError } from 'rxjs/operators';
import { SetError } from '../../error/store/error.actions';
import { Navigate } from '@ngxs/router-plugin';

@State<Trades>({
  name: 'trades',
  defaults: {
    tradesInfo: {
      docs: [],
      totalDocs: 0,
      limit: 0,
      hasPrevPage: false,
      hasNextPage: false,
      page: 0,
      totalPages: 0,
      pagingCounter: 0,
      prevPage: 0,
      nextPage: 0
    },
    tradeDetails: {
      _id: '',
      title: '',
      text: '',
      author: '',
      offers: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
})
export class TradesState {
  constructor(private store: Store, private tradesService: TradesService) {}

  @Selector()
  static getTradeDetails({ tradeDetails }: Trades) {
    return tradeDetails;
  }

  @Selector()
  static getTrades({ tradesInfo }: Trades) {
    return tradesInfo;
  }

  @Action(GetTrade)
  getTrade({ dispatch }: StateContext<Trades>, { id }: GetTrade) {
    return this.tradesService.getTrade(id).pipe(
      tap(tradeResponse => dispatch(new GetTradeSuccess(tradeResponse))),
      catchError(error => dispatch(new GetTradeFailed(error.error)))
    );
  }

  @Action(GetTradeSuccess)
  getTradeSuccess({ patchState }: StateContext<Trades>, tradeDetails: GetTradeSuccess) {
    patchState({ ...tradeDetails });
  }

  @Action(GetTrades)
  getTrades({ dispatch }: StateContext<Trades>, { page }: GetTrades) {
    return this.tradesService.getTrades(page).pipe(
      tap(tradesResponse => dispatch(new GetTradesSuccess(tradesResponse))),
      catchError(error => dispatch(new GetTradesFailed(error.error)))
    );
  }

  @Action(GetTradesSuccess)
  getTradesSuccess({ patchState }: StateContext<Trades>, tradesInfo: GetTradeSuccess) {
    patchState({ ...tradesInfo });
  }

  @Action(GetTradesByUsername)
  getTradesByUsername({ dispatch }: StateContext<Trades>, { page, username }: GetTradesByUsername) {
    return this.tradesService.getTradesByUsername(page, username).pipe(
      tap(tradesResponse => dispatch(new GetTradesByUsernameSuccess(tradesResponse))),
      catchError(error => dispatch(new GetTradesByUsernameFailed(error.error)))
    );
  }

  @Action(GetTradesByUsernameSuccess)
  getTradesByUsernameSuccess({ patchState }: StateContext<Trades>, tradesInfo: GetTradeSuccess) {
    patchState({ ...tradesInfo });
  }

  @Action(AddOffer)
  addoffer({ dispatch }: StateContext<Trades>, { tradeId, offer }: AddOffer) {
    return this.tradesService.addOffer(tradeId, offer.text).pipe(
      tap(() => dispatch(new AddOfferSuccess(tradeId))),
      catchError(error => dispatch(new AddOfferFailed(error.error)))
    );
  }

  @Action(AddOfferSuccess)
  addofferSucess({ dispatch }: StateContext<Trades>, { tradeId }: AddOfferSuccess) {
    dispatch(new GetTrade(tradeId));
  }

  @Action(CreateTrade)
  createTrade({ dispatch }: StateContext<Trades>, { trade }: CreateTrade) {
    return this.tradesService.createTrade(trade.title, trade.text).pipe(
      tap(() => dispatch(new CreateTradeSuccess())),
      catchError(error => dispatch(new CreateTradeFailed(error.error)))
    );
  }

  @Action(CreateTradeSuccess)
  createTradeSucess({ dispatch }: StateContext<Trades>) {
    dispatch(new GetTrades(1));
  }

  @Action([
    GetTradeFailed,
    GetTradesFailed,
    GetTradesByUsernameFailed,
    AddOfferFailed,
    CreateTradeFailed
  ])
  error({ dispatch }: StateContext<Trades>, { error }: any) {
    if (error && error.message) {
      dispatch(new SetError(error));
    } else {
      dispatch(new SetError({ message: error }));
    }
  }
}
