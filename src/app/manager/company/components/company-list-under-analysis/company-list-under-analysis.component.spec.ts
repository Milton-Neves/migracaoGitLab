import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CompanyListUnderAnalysisComponent } from './company-list-under-analysis.component'

describe('CompanyListUnderAnalysisComponent', () => {
  let component: CompanyListUnderAnalysisComponent
  let fixture: ComponentFixture<CompanyListUnderAnalysisComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyListUnderAnalysisComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListUnderAnalysisComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
