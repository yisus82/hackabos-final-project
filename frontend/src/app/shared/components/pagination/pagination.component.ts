import { Component, Input } from '@angular/core';
import {
  faBackward,
  faForward,
  faStepBackward,
  faStepForward
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Input() resources: string;
  firstIcon = faBackward;
  previousIcon = faStepBackward;
  nextIcon = faStepForward;
  lastIcon = faForward;

  checkDisabled(event) {
    event.path.forEach(element => {
      if (element instanceof HTMLElement) {
        if (element.className === 'disabled') {
          event.preventDefault();
          return;
        }
      }
    });
  }
}
