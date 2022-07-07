import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Observable, of, Subscription } from 'rxjs'
import { distinctUntilChanged, map, tap } from 'rxjs/operators'

import { formTranslated } from '../../@utils/form.translate'
import { NgxFilteringService } from '../../ngx-filtering.service'

@Component({
  selector: 'ngx-modal-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss'],
})
export class FilteringComponent implements OnInit, OnDestroy {
  @Output() filterEvent = new EventEmitter<string[]>()
  @Output() formFilter = new EventEmitter<FormGroup>()
  private subs: Subscription = new Subscription()

  filters: string[] = []
  auxFilters: any = {}
  filterForm!: FormGroup

  filterActive: any = {
    experience: false,
    schooling: false,
    sex: false,
    pcd: false,
    dependent: false,
    vehicle: false,
    youngApprentice: false,
    cnh: false,
    willingness: false,
  }

  options: any = []
  filteredOptions$!: Observable<any>
  openAutoComplete: boolean = false
  optionFound!: any
  jobName: string = ''
  constructor(
    private fb: FormBuilder,
    private toastService: ToastrService,
    private ngxFilteringService: NgxFilteringService
  ) {}

  showAutoComplete() {
    setTimeout(() => (this.openAutoComplete = !this.openAutoComplete), 100)
  }

  ngOnInit(): void {
    this.createForm()
    this.onFormChange()
    this.ngxFilteringService.jobs
      .pipe(map((res: any) => res.data))
      .subscribe((res: any[]) => {
        res.sort((a: any, b: any) => {
          let jobA = a.name.toLowerCase()
          let jobB = b.name.toLowerCase()
          if (jobA < jobB) return -1
          if (jobA > jobB) return 1
          return 0
        })
        res.forEach((option) => this.options.push(option.name))
      })
    this.filteredOptions$ = of(this.options)
  }

  setAllFiltersToFalse(jobName?: string) {
    Object.keys(this.filterActive).forEach(
      (section) => (this.filterActive[section] = false)
    )
    if (jobName!.length == 0)
      this.formFilter.emit(
        Object.assign(this.filterForm.value, {
          job: { jobName: this.optionFound },
        })
      )
    this.filterForm.reset({}, { emitEvent: false })
  }

  toggleGroupFilters(dropdownName: string) {
    let jobNameFind = this.optionIsPresent(this.optionFound)
    if (
      this.optionFound == '' ||
      this.optionFound == null ||
      jobNameFind.length == 0 ||
      this.optionFound.length < 0
    ) {
      this.toastService.warning(
        'Você precisa digitar um cargo antes de acessar os demais filtros.',
        'Cargo Inválido'
      )
    } else this.filterActive[dropdownName] = !this.filterActive[dropdownName]
  }

  onFormChange() {
    this.allFiltersCheck()
  }

  traslateFormToPt(form: any, formTranslated: any) {
    let formCriteria: any = new Object(form)
    formCriteria = Object.assign({
      ...form.job,
      ...form.experience,
      ...form.scholarity,
      ...form.sexes,
      ...form.pcd,
      ...form.cnh,
      ...form.willingness,
      ...form.youngApprentice,
      ...form.vehicle,
      ...form.dependents,
    })
    Object.keys(formCriteria).forEach((key: any) => {
      const value = formCriteria[key]
      const newKey = formTranslated[key]
      if (value == false || value === null || value === '') {
        if (this.auxFilters[newKey]) delete this.auxFilters[newKey]
      } else {
        this.auxFilters[newKey] = value
      }
    })
    const auxFiltersArray = Object.keys(this.auxFilters)
    this.filters = auxFiltersArray
  }

  selectJobName(option: string) {
    this.optionFound = option
    this.traslateFormToPt(
      { ...this.filterForm.value, job: { jobName: this.optionFound } },
      formTranslated
    )
    this.filterEvent.emit(this.filters)
    this.jobName = option
    this.formFilter.emit(
      Object.assign(this.filterForm.value, {
        job: { jobName: this.optionFound },
      })
    )
  }

  onChangeJobName() {
    if (this.jobName) {
      this.optionFound = this.optionIsPresent(this.jobName)[0] || null
      if (!this.optionFound) this.setAllFiltersToFalse(this.jobName)
    } else {
      this.optionFound = null
      this.setAllFiltersToFalse(this.jobName)
    }
    this.filteredOptions$ = of(this.optionIsPresent(this.jobName))
    this.traslateFormToPt(
      { ...this.filterForm.value, job: { jobName: this.jobName } },
      formTranslated
    )
    this.filterEvent.emit(this.filters)
  }

  allFiltersCheck() {
    const subscribeWorkFilter = this.filterForm?.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((hasTerm: any) => {
          this.traslateFormToPt(
            { ...this.filterForm.value, job: { jobName: this.optionFound } },
            formTranslated
          )
          this.filterEvent.emit(this.filters)
          this.formFilter.emit(
            Object.assign(this.filterForm.value, {
              job: { jobName: this.optionFound },
            })
          )
        })
      )
      .subscribe()
    this.subs.add(subscribeWorkFilter)
  }

  optionIsPresent(value: string) {
    let newValue = new String(value)
    return this.options.filter((option: any) =>
      option.toLowerCase().includes(newValue.toLowerCase())
    )
  }

  createForm() {
    this.filterForm = this.fb.group({
      experience: this.fb.group({
        withExperience: [null],
        withoutExperience: [null],
      }),
      scholarity: this.fb.group({
        noInstruction: [null],
        elementarySchool: [null],
        elementarySchoolIncomplete: [null],
        secondarySchool: [null],
        secondarySchoolIncomplete: [null],
        vocationalSchool: [null],
        vocationalSchoolIncomplete: [null],
        higherEducation: [null],
        higherEducationIncomplete: [null],
        postGraduate: [null],
        postGraduateIncomplete: [null],
        doctoral: [null],
        doctoralIncomplete: [null],
        postDoctoral: [null],
        postDoctoralIncomplete: [null],
      }),
      sexes: this.fb.group({
        female: [null],
        male: [null],
      }),
      pcd: this.fb.group({
        withPCD: [null],
        withoutPCD: [null],
      }),
      dependents: this.fb.group({
        withDependents: [null],
        withoutDependents: [null],
      }),
      vehicle: this.fb.group({
        withVehicle: [null],
        withoutVehicle: [null],
      }),
      youngApprentice: this.fb.group({
        onlyYoungApprentice: [null],
        withoutYoungApprentice: [null],
      }),
      cnh: this.fb.group({
        catA: [null],
        catB: [null],
        catC: [null],
        catD: [null],
        catE: [null],
      }),
      willingness: this.fb.group({
        morning: [null],
        afternoon: [null],
        night: [null],
        saturday: [null],
        sunday: [null],
        travel: [null],
      }),
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
