import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UnarchivingModalComponent } from './unarchiving-modal.component'

describe('UnarchivingModalComponent', () => {
  let component: UnarchivingModalComponent
  let fixture: ComponentFixture<UnarchivingModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnarchivingModalComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UnarchivingModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
