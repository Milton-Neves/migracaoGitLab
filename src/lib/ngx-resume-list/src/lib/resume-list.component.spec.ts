import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NgxResumeListComponent } from './resume-list.component'

describe('ResumeListComponent', () => {
  let component: NgxResumeListComponent
  let fixture: ComponentFixture<NgxResumeListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxResumeListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxResumeListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
