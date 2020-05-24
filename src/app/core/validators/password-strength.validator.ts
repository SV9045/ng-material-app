import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordStrengthValidator(control: AbstractControl): ValidationErrors | ValidatorFn | null {

  const value: string = control.value || '';

  if (!value) {
    return null;
  }

  // Validation for Upper Case Characters
  const upperCaseCharacters = /[A-Z]+/g;
  if(upperCaseCharacters.test(value) === false) {
    return{ passwordStrength: `Password should has atleast one Upper Case character` };
  }

  // Validation for Lower Case Characters
  const lowerCaseCharacters = /[a-z]+/g;
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `Password should has atleast one Lower Case character` };
  }

  // Validation for Number Characters
  const numberCharacters = /[0-9]+/g;
  if(numberCharacters.test(value) === false) {
    return { passwordStrength: `Password should has atleast one Number character` };
  }

  // Validation for Special Characters
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `Password should has atleast one special character` };
  }
  return null;
}