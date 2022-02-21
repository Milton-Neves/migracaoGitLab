import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ForwardingComponent } from './forwarding.component'

describe('ForwardingComponent', () => {
  let component: ForwardingComponent
  let fixture: ComponentFixture<ForwardingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForwardingComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
