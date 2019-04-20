import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MediaInfosState } from '../../store/media-infos.state';
import { Observable } from 'rxjs';
import { MediaInfoDetails } from '../../media-infos.models';
import { ActivatedRoute } from '@angular/router';
import { GetMediaInfo } from '../../store/media-infos.actions';
import { GetReviewsByMediaInfo } from 'src/app/reviews/store/reviews.actions';

@Component({
  selector: 'app-media-info-details',
  templateUrl: './media-info-details.component.html',
  styleUrls: ['./media-info-details.component.scss']
})
export class MediaInfoDetailsComponent implements OnInit {
  @Select(MediaInfosState.getMediaInfoDetails) mediaInfoDetails$: Observable<MediaInfoDetails>;
  currentUser = this.store.selectSnapshot(state => state.auth);
  currentPage = 1;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetMediaInfo(routeParams.id));
      this.store.dispatch(new GetReviewsByMediaInfo(this.currentPage, routeParams.id));
    });
  }
}
