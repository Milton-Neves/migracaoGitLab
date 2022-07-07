import { TestBed } from '@angular/core/testing'

import { NgxFilteringService } from './ngx-filtering.service'

describe('NgxFilteringService', () => {
  let service: NgxFilteringService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NgxFilteringService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
