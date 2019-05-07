import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MediaInfosState } from '../../store/media-infos.state';
import { Observable } from 'rxjs';
import { MediaInfosInfo } from '../../media-infos.models';
import { ActivatedRoute } from '@angular/router';
import { GetMediaInfos } from '../../store/media-infos.actions';

@Component({
  selector: 'app-media-infos',
  templateUrl: './media-infos.component.html',
  styleUrls: ['./media-infos.component.scss']
})
export class MediaInfosComponent implements OnInit, OnDestroy {
  @Select(MediaInfosState.getMediaInfos) mediaInfosInfo$: Observable<MediaInfosInfo>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetMediaInfos(routeParams.page));
    });
  }

  ngOnDestroy() {
    this.store.reset({ auth: this.store.selectSnapshot(state => state.auth) });
  }
}
