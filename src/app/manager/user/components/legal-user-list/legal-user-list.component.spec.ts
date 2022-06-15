import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LegalUserListComponent } from './legal-user-list.component'

describe('LegalUserListComponent', () => {
  let component: LegalUserListComponent
  let fixture: ComponentFixture<LegalUserListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalUserListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalUserListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
