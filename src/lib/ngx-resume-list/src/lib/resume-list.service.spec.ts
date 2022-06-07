import { TestBed } from '@angular/core/testing'

import { ResumeListService } from './resume-list.service'

describe('ResumeListService', () => {
  let service: ResumeListService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ResumeListService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
