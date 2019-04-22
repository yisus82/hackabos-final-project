import { AbstractControl } from '@angular/forms';

export function UsernameValidator(control: AbstractControl): { [key: string]: boolean } {
  const REGEXP = /^[a-z0-9]{5,20}$/;

  if (control.value && !REGEXP.test(control.value)) {
    return { invalidUsername: true };
  }

  return null;
}
