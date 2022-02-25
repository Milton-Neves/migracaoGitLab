import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'

import { NgxModalService } from './ngx-modal.service'

interface Options {
  ignoreBackClick?: boolean
}
@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal">
      <div class="modal-container">
        <div class="modal-body">
          <div class="modal-content">
            <ng-container #container></ng-container>
          </div>
        </div>
      </div>
      <div class="modal-background"></div>
    </div>
  `,
  styles: [
    `
      .modal {
        display: block;
        z-index: 999;
        overflow: auto;
        width: auto;

        .modal-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9999;

          .modal-body {
            background-color: #ffffff;
            width: fit-content;
            height: fit-content;
            z-index: 900;
            border-radius: 15px;
          }
        }
        .modal-background {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: #000;
          opacity: 0.65;
          z-index: 800;
        }
      }

      .active {
        display: block !important;
      }

      .desactive {
        display: none !important;
      }
    `,
  ],
})
export class NgxModalComponent<T> implements OnInit {
  childComponentRef!: ComponentRef<T>
  closed: boolean = false

  onClose: EventEmitter<T> = new EventEmitter()
  onInit: EventEmitter<T> = new EventEmitter()

  @ViewChild('container', { read: ViewContainerRef }) entry?: ViewContainerRef
  private element: any
  constructor(
    public modalService: NgxModalService,
    el: ElementRef,
    private resolver: ComponentFactoryResolver
  ) {
    this.element = el.nativeElement
  }

  ngOnInit(): void {}

  open<T>(component: Type<T>, data?: Partial<T>, options?: Options): void {
    this.element.style.display = 'block'

    this.entry?.clear()

    const factory = this.resolver.resolveComponentFactory(component)
    this.childComponentRef = this.entry?.createComponent(factory) as any

    Object.keys(data || {}).forEach((key) => {
      const anyData = data as any
      if (anyData === undefined) return
      if (anyData[key] === undefined) return
      const intanceRef = this.childComponentRef.instance as any
      intanceRef[key] = anyData[key]
    })

    if (!options?.ignoreBackClick) {
      this.element.addEventListener('click', (el: any) => {
        if (el.target.className === 'modal-container') {
          this.close()
        }
      })
    }

    this.onInit.emit(this.childComponentRef.instance)
  }

  close(): void {
    if (this.closed) return

    this.closed = true
    this.modalService.close(this.childComponentRef)
    this.emitCloseEvent()
  }

  ngOnDestroy(): void {
    this.childComponentRef.destroy()
  }

  emitCloseEvent(): void {
    this.onClose.emit(this.childComponentRef.instance)
  }
}
