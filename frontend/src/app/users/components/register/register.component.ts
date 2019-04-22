import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatchPasswordValidator } from '../../validators/match-password.validator';
import { MailValidator } from '../../validators/mail.validator';
import { Store, Actions, ofAction } from '@ngxs/store';
import { Register, RegisterSuccess } from '../../store/auth/auth.actions';
import { UsernameValidator } from '../../validators/username.validator';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group(
    {
      username: ['', [Validators.required, UsernameValidator]],
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required, PasswordValidator]],
      confirmPassword: ['', [Validators.required, PasswordValidator]]
    },
    {
      updateOn: 'blur',
      validators: [MatchPasswordValidator]
    }
  );

  constructor(private fb: FormBuilder, private store: Store, private actions$: Actions) {}

  ngOnInit() {
    this.actions$.pipe(ofAction(RegisterSuccess)).subscribe(() => this.registerForm.reset());
  }

  register() {
    if (!this.registerForm.valid) {
      this.markFormGroupAsTouched(this.registerForm);
      return;
    }
    this.store.dispatch(new Register(this.registerForm.value));
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => control.markAsTouched());
  }

  inputChange(event, controlName) {
    this.registerForm.get(controlName).setValue(event.target.value);
  }
}
