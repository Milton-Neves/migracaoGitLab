import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResumeJobsViewComponent } from './resume-jobs-view.component'

describe('ResumeJobsViewComponent', () => {
  let component: ResumeJobsViewComponent
  let fixture: ComponentFixture<ResumeJobsViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeJobsViewComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeJobsViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
