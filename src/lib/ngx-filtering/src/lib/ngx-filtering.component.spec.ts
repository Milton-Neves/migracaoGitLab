import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NgxFilteringComponent } from './ngx-filtering.component'

describe('NgxFilteringComponent', () => {
  let component: NgxFilteringComponent
  let fixture: ComponentFixture<NgxFilteringComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxFilteringComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFilteringComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
