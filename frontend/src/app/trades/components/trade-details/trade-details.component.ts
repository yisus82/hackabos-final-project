import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TradesState } from '../../store/trades.state';
import { Observable } from 'rxjs';
import { TradeDetails } from '../../trades.models';
import { ActivatedRoute } from '@angular/router';
import { GetTrade } from '../../store/trades.actions';

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.scss']
})
export class TradeDetailsComponent implements OnInit, OnDestroy {
  @Select(TradesState.getTradeDetails) tradeDetails$: Observable<TradeDetails>;
  currentUser = this.store.selectSnapshot(state => state.auth);

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetTrade(routeParams.id));
    });
  }

  ngOnDestroy() {
    this.store.reset({ auth: this.store.selectSnapshot(state => state.auth) });
  }

  reverseArray(arr: any[]) {
    return arr.map((item, idx) => arr[arr.length - 1 - idx]);
  }
}
