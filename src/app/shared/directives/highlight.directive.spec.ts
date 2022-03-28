import { ElementRef } from '@angular/core'
import { HighlightDirective } from './highlight.directive'

describe('HighlightDirective', () => {
  let el: ElementRef
  it('should create an instance', () => {
    const directive = new HighlightDirective(el)
    expect(directive).toBeTruthy()
  })
})
