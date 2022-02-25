import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ActiveResumeListComponent } from './active-resume-list.component'

describe('ActiveResumeListComponent', () => {
  let component: ActiveResumeListComponent
  let fixture: ComponentFixture<ActiveResumeListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveResumeListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveResumeListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
