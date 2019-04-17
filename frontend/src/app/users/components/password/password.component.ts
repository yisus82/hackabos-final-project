import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatchPasswordValidator } from '../../validators/match-password.validator';
import { Store, Actions, ofAction } from '@ngxs/store';
import { ChangePassword, ChangePasswordSuccess } from '../../store/auth.actions';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm = this.fb.group(
    {
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      updateOn: 'blur',
      validators: [MatchPasswordValidator]
    }
  );

  constructor(private fb: FormBuilder, private store: Store, private actions$: Actions) {}

  ngOnInit() {
    this.actions$.pipe(ofAction(ChangePasswordSuccess)).subscribe(() => this.passwordForm.reset());
  }

  changePassword() {
    if (!this.passwordForm.valid) {
      this.markFormGroupAsTouched(this.passwordForm);
      return;
    }
    this.store.dispatch(new ChangePassword(this.passwordForm.value));
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => control.markAsTouched());
  }
}
