import { TestBed } from '@angular/core/testing'

import { CompanyMetricService } from './company-metric.service'

describe('CompanyMetricService', () => {
  let service: CompanyMetricService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CompanyMetricService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
