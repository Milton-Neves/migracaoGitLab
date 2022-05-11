import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CitizenModalComponent } from './citizen-modal.component'

describe('CitizenModalComponent', () => {
  let component: CitizenModalComponent
  let fixture: ComponentFixture<CitizenModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitizenModalComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
