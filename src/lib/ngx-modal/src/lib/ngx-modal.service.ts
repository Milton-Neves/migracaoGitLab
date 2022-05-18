import { ApplicationRef, ComponentRef, Injectable, Type } from '@angular/core'
import { Observable } from 'rxjs'

import { NgxModalComponent } from './ngx-modal.component'

interface Options {
  ignoreBackClick?: boolean
}
@Injectable({
  providedIn: 'root',
})
export class NgxModalService {
  modals: ComponentRef<any>[] = []

  id?: string
  constructor(private appRef: ApplicationRef) {}

  add(modal: ComponentRef<NgxModalComponent<any>>) {
    this.modals.push(modal)
  }

  open<T>(
    component: Type<T>,
    data?: Partial<T>,
    options?: Options
  ): Observable<NgxModalComponent<T>> {
    return new Observable<NgxModalComponent<T>>((subscriber) => {
      const root = document.querySelector('app-root')

      const modalDiv = document.createElement('div')
      modalDiv.id = 'modal-injector-' + this.modals.length
      root?.appendChild(modalDiv)

      const modalRef: ComponentRef<NgxModalComponent<T>> =
        this.appRef.bootstrap(
          NgxModalComponent,
          `#${modalDiv.id}`
        ) as ComponentRef<NgxModalComponent<T>>
      modalRef.instance.open(component, data, options)
      this.add(modalRef)

      subscriber.next(modalRef.instance)
    })
  }

  close(component?: ComponentRef<any>) {
    if (component !== undefined) {
      for (let i = this.modals.length - 1; i >= 0; i--) {
        const refModal = this.modals[i]
        if (
          component.componentType.name ===
          refModal.instance.childComponentRef.componentType.name
        ) {
          refModal.instance.close()
          refModal.destroy()
          break
        }
      }
      return
    }
    this.modals[this.modals.length - 1].instance.close()
    this.modals[this.modals.length - 1].destroy()
    this.modals.pop()
  }
}
