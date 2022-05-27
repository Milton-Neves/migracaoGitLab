import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CompanyRemovalConfirmationComponent } from './company-removal-confirmation.component'

describe('CompanyRemovalConfirmationComponent', () => {
  let component: CompanyRemovalConfirmationComponent
  let fixture: ComponentFixture<CompanyRemovalConfirmationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyRemovalConfirmationComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRemovalConfirmationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
