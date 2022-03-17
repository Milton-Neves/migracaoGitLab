import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ForwardingEditComponent } from './forwarding-edit.component'

describe('ForwardingEditComponent', () => {
  let component: ForwardingEditComponent
  let fixture: ComponentFixture<ForwardingEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForwardingEditComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardingEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
