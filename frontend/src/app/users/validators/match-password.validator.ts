import { FormGroup } from '@angular/forms';

export function MatchPasswordValidator(group: FormGroup) {
  const password = group.get('password').value;
  const confirmedPassword = group.get('confirmPassword').value;

  if (password !== confirmedPassword) {
    return { passwordMismatch: true };
  }

  return null;
}
