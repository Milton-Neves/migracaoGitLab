import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
  @Input() styles!: any
  @Input() align!: any
  @Input() placeholder!: string
  @Output() search = new EventEmitter<string>()
  singleSearchForm: FormGroup = this.fb.group({
    search: [''],
  })

  constructor(private fb: FormBuilder) {}

  singleFormChange() {
    this.singleSearchForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(600),
        tap((res) => {
          this.search.emit(res.search)
        })
      )
      .subscribe()
  }

  ngOnInit(): void {
    this.singleFormChange()
  }
}
