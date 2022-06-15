import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss'],
})
export class SortFilterComponent implements OnInit {
  openFilterDropdown: boolean = false
  openSubsectionDropdown: boolean = false
  form!: FormGroup
  @Output() sort: EventEmitter<string> = new EventEmitter()
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createSimpleForm()
    this.form.valueChanges.subscribe((res) => this.sort.emit(res.checked))
  }

  createSimpleForm() {
    this.form = this.fb.group({
      checked: ['desc', [Validators.required]],
    })
  }
}
