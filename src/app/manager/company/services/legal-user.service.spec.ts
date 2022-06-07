import { TestBed } from '@angular/core/testing'

import { LegalUserService } from './legal-user.service'

describe('LegalUserService', () => {
  let service: LegalUserService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LegalUserService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
