import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    return value.length > 10
      ? value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      : value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
}
