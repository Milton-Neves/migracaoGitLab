import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ConfirmationForwardingModalComponent } from './confirmation-forwarding-modal.component'

describe('ConfirmationForwardingModalComponent', () => {
  let component: ConfirmationForwardingModalComponent
  let fixture: ComponentFixture<ConfirmationForwardingModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationForwardingModalComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationForwardingModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
