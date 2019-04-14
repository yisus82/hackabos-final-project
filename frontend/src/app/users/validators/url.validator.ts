import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

export function UrlValidator(control: AbstractControl) {
  // tslint:disable-next-line
  const URL_REGEXP = /^(http?|ftp|https):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;

  if (control.value && (control.value.length <= 5 || !URL_REGEXP.test(control.value))) {
    return { malformedUrl: true };
  }

  return null;
}
