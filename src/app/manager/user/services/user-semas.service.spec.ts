import { TestBed } from '@angular/core/testing'

import { UserSemasService } from './user-semas.service'

describe('UserSemasService', () => {
  let service: UserSemasService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(UserSemasService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
