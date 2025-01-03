
import { AbstractControl, ValidationErrors } from '@angular/forms';


/*WHITESPACE Validation*/
export class NoWhitespaceValidator {
  static NoWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': 'value is only whitespace' }
  };
}
/*WHITESPACE Validation*/
