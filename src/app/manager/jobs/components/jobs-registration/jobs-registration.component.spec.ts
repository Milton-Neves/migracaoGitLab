import { ComponentFixture, TestBed } from '@angular/core/testing'

import { JobsRegistrationComponent } from './jobs-registration.component'

describe('JobsRegistrationComponent', () => {
  let component: JobsRegistrationComponent
  let fixture: ComponentFixture<JobsRegistrationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsRegistrationComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsRegistrationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
