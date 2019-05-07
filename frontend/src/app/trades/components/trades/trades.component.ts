import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TradesState } from '../../store/trades.state';
import { Observable } from 'rxjs';
import { TradesInfo } from '../../trades.models';
import { ActivatedRoute } from '@angular/router';
import { GetTradesByUsername, GetTrades } from '../../store/trades.actions';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit, OnDestroy {
  @Select(TradesState.getTrades) tradesInfo$: Observable<TradesInfo>;

  resources: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams.username) {
        this.resources = 'trades/user/' + routeParams.username;
        this.store.dispatch(new GetTradesByUsername(routeParams.page, routeParams.username));
      } else {
        this.resources = 'trades';
        this.store.dispatch(new GetTrades(routeParams.page));
      }
    });
  }

  ngOnDestroy() {
    this.store.reset({ auth: this.store.selectSnapshot(state => state.auth) });
  }
}
