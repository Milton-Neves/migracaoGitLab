import { TestBed } from '@angular/core/testing'

import { PhysicalUserService } from './physical-user.service'

describe('PhysicalUserService', () => {
  let service: PhysicalUserService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PhysicalUserService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
