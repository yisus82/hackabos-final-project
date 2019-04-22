import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';
import { CreateTrade, CreateTradeSuccess } from '../../store/trades.actions';

@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrls: ['./trade-form.component.scss']
})
export class TradeFormComponent implements OnInit {
  tradeForm = this.fb.group(
    {
      title: ['', [Validators.required]],
      text: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store, private actions$: Actions) {}

  ngOnInit() {
    this.actions$.pipe(ofAction(CreateTradeSuccess)).subscribe(() => this.tradeForm.reset());
  }

  create() {
    if (!this.tradeForm.valid) {
      this.markFormGroupAsTouched(this.tradeForm);
      return;
    }
    this.store.dispatch(new CreateTrade(this.tradeForm.value));
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => control.markAsTouched());
  }
}
