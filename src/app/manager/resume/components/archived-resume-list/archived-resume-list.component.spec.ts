import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArchivedResumeListComponent } from './archived-resume-list.component'

describe('ArchivedResumeListComponent', () => {
  let component: ArchivedResumeListComponent
  let fixture: ComponentFixture<ArchivedResumeListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchivedResumeListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedResumeListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
