import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';
import { AddOffer, AddOfferSuccess } from '../../store/trades.actions';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {
  @Input() tradeID: string;
  offerForm = this.fb.group(
    {
      text: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store, private actions$: Actions) {}

  ngOnInit() {
    this.actions$.pipe(ofAction(AddOfferSuccess)).subscribe(() => this.offerForm.reset());
  }

  offer() {
    if (!this.offerForm.valid) {
      this.markFormGroupAsTouched(this.offerForm);
      return;
    }
    this.store.dispatch(new AddOffer(this.offerForm.value, this.tradeID));
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => control.markAsTouched());
  }
}
