import { Component, Input } from '@angular/core';
import {
  faBackward,
  faForward,
  faStepBackward,
  faStepForward
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Input() hasPrevPage: boolean;
  @Input() hasNextPage: boolean;
  @Input() resources: string;
  firstIcon = faBackward;
  previousIcon = faStepBackward;
  nextIcon = faStepForward;
  lastIcon = faForward;

  constructor(private router: Router) {}

  navigate(canNavigate: boolean, path: string) {
    if (canNavigate) {
      this.router.navigateByUrl(path);
    }
  }
}
