import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ForwardingModalComponent } from './forwarding-modal.component'

describe('ForwardingModalComponent', () => {
  let component: ForwardingModalComponent
  let fixture: ComponentFixture<ForwardingModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForwardingModalComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardingModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
