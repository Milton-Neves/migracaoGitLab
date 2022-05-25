import { ComponentFixture, TestBed } from '@angular/core/testing'

import { JobListModalComponent } from './job-list-modal.component'

describe('JobListModalComponent', () => {
  let component: JobListModalComponent
  let fixture: ComponentFixture<JobListModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobListModalComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
