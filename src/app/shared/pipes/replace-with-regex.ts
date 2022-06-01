import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'replace',
})
export class ReplaceUnderlineToSpacePipe implements PipeTransform {
  transform(value: any, ...args: string[]): unknown {
    const from = args[0]
    const to = args[1]
    return value.replace(new RegExp(from, 'g'), to)
  }
}
