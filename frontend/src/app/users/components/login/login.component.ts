import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MailValidator } from '../../validators/mail.validator';
import { Store } from '@ngxs/store';
import { Login } from '../../store/auth/auth.actions';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required, PasswordValidator]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store) {}

  login() {
    if (!this.loginForm.valid) {
      this.markFormGroupAsTouched(this.loginForm);
      return;
    }
    this.store.dispatch(new Login(this.loginForm.value));
  }

  markFormGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => control.markAsTouched());
  }

  inputChange(event, controlName) {
    this.loginForm.get(controlName).setValue(event.target.value);
  }
}
