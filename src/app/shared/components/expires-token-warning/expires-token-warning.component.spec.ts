import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExpiresTokenWarningComponent } from './expires-token-warning.component'

describe('ExpiresTokenWarningComponent', () => {
  let component: ExpiresTokenWarningComponent
  let fixture: ComponentFixture<ExpiresTokenWarningComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpiresTokenWarningComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiresTokenWarningComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
