import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
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
    if (this.offerForm.valid) {
      this.store.dispatch(new AddOffer(this.offerForm.value, this.tradeID));
    }
  }
}
