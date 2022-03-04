import { TestBed } from '@angular/core/testing'

import { NgxModalService } from './ngx-modal.service'

describe('NgxModalService', () => {
  let service: NgxModalService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NgxModalService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
