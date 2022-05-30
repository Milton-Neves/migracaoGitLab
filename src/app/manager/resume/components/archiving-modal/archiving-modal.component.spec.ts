import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArchivingModalComponent } from './archiving-modal.component'

describe('ArchivingModalComponent', () => {
  let component: ArchivingModalComponent
  let fixture: ComponentFixture<ArchivingModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchivingModalComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivingModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
