import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } {
  const REGEXP = /^[a-zA-Z0-9]{3,30}$/;

  if (control.value && !REGEXP.test(control.value)) {
    return { invalidPassword: true };
  }

  return null;
}
