import { TestBed } from '@angular/core/testing'

import { PrintResumeService } from './print-resume.service'

describe('PrintResumeService', () => {
  let service: PrintResumeService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PrintResumeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
