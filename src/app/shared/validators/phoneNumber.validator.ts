import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value
    if (!value) {
      return null
    }
    return !new RegExp(/\d{2}\s?\d{4,5}-?\d{4}/g).test(value)
      ? { phoneNumber: true }
      : null
  }
}
