import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent {
  @Input() control: FormControl;
  @Input() group?: FormGroup;

  errorIcon: IconProp = faExclamationTriangle;
}
