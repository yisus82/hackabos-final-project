import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MailValidator } from '../../validators/mail.validator';
import { Store } from '@ngxs/store';
import { Login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store) {}

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(new Login(this.loginForm.value));
    }
  }

  inputChange(data) {
    data.control.setValue(data.$event.target.value);
  }
}
