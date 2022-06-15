import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PhysicalUserListComponent } from './physical-user-list.component'

describe('PhysicalUserListComponent', () => {
  let component: PhysicalUserListComponent
  let fixture: ComponentFixture<PhysicalUserListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhysicalUserListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalUserListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
