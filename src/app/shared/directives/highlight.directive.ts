import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight!: string

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('#999999')
  }

  private highlight(color: string) {
    this.el.nativeElement.children[0].style.backgroundColor = color
  }
}
