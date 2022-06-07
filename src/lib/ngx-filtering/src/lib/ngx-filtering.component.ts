import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

import {
  criteriaScholarity,
  criteriaSex,
} from './@utils/filtering-criteria.model'

@Component({
  selector: 'ngx-filtering',
  template: `
    <div class="modal-background" *ngIf="filterActive.filterContainer"></div>
    <div class="app-filtering" *ngIf="filterActive.filterContainer">
      <ngx-modal-filtering
        (filterEvent)="setFilters($event)"
        (formFilter)="getParams($event)"
      >
      </ngx-modal-filtering>
    </div>
    <div class="search">
      <div class="filter-global-container">
        <div
          class="filter-container"
          (click)="filterActive.filterContainer = !filterActive.filterContainer"
        >
          <div class="filter-icon"></div>
          <svg
            style="margin-left: 2px;"
            width="12"
            height="8"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L5 5L8 2"
              stroke="#1C3152"
              stroke-width="1.5"
              stroke-linecap="square"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="filter-active-group">
          <span *ngFor="let filter of filters">{{ filter }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./ngx-filtering.component.scss'],
})
export class NgxFilteringComponent implements OnInit, OnDestroy {
  @Output() paramsToRequest = new EventEmitter<any>()
  @Output() filtersName = new EventEmitter<any>()
  filters: string[] = []
  jobFiltered = ''
  concatedObjectFilters: any = {}
  filterActive = {
    filterContainer: false,
  }
  singleFormCriteria: FormGroup = this.fb.group({
    generalInfo: [null],
  })
  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnDestroy(): void {
    this.filters = []
    this.concatedObjectFilters = {}
    document.removeAllListeners!('click')
  }

  ngOnInit(): void {
    document.addEventListener('click', (el: any) => {
      if (el.target.className === 'modal-background') {
        this.filterActive.filterContainer = false
      }
    })
  }

  setFilters(filters: any) {
    let checkGeneralInfo = this.filters.find((f) => f == 'Informações Gerais')
    this.filters = filters
    if (checkGeneralInfo && this.jobFiltered)
      this.filters.push('Informações Gerais')
    this.filtersName.emit(this.filters)
  }

  checkDisponibility() {
    if (this.jobFiltered === undefined || this.jobFiltered === '')
      this.toastr.warning(
        'Selecione um cargo em filtros para realizar a pesquisa de currículos!',
        'Filtro Indisponível'
      )
  }

  /**
   * Method getParams
   * @param event - formGroup value
   * @description This method handle the object to request resumes list.
   * The event param can't be handle directly, because it will change form value on father component
   */
  getParams(event: any) {
    if (
      this.concatedObjectFilters.generalInfo != null &&
      this.concatedObjectFilters.generalInfo != undefined
    ) {
      let generalInfo = this.concatedObjectFilters.generalInfo
      this.concatedObjectFilters = {}
      this.concatedObjectFilters.generalInfo = generalInfo
    } else if (this.concatedObjectFilters != null) {
      this.concatedObjectFilters = {}
    }

    if (
      event.experience &&
      Object.keys(this.clearNullValues(event.experience)).length != 0
    ) {
      let valueCriteriaExperience =
        event.experience.withoutExperience && !event.experience.withExperience
          ? false
          : event.experience.withExperience
          ? true
          : console.error('ERROR CRITERIA EXPERIENCE')
      if (event.experience.withoutExperience != event.experience.withExperience)
        this.concatedObjectFilters = Object.assign({
          ...this.concatedObjectFilters,
          workExperiences: valueCriteriaExperience,
        })
    }

    if (
      event.scholarity &&
      Object.keys(this.clearNullValues(event.scholarity)).length != 0
    ) {
      let valueCriteriaSchooling = this.translateMultipleValuesCriteria(
        event.scholarity,
        criteriaScholarity
      )
      this.concatedObjectFilters = Object.assign({
        ...this.concatedObjectFilters,
        scholarity: Object.values(valueCriteriaSchooling).toString(),
      })
    }

    if (
      event.sexes &&
      Object.keys(this.clearNullValues(event.sexes)).length != 0
    ) {
      let valueCriteriaSex = this.translateMultipleValuesCriteria(
        event.sexes,
        criteriaSex
      )
      this.concatedObjectFilters = Object.assign({
        ...this.concatedObjectFilters,
        sexes: Object.values(valueCriteriaSex).toString(),
      })
    }

    if (event.cnh && Object.keys(this.clearNullValues(event.cnh)).length != 0) {
      let valueCriteriaCnh = Object.keys(event.cnh).toString()
      this.concatedObjectFilters = Object.assign({
        ...this.concatedObjectFilters,
        cnh: valueCriteriaCnh,
      })
    }

    if (
      event.willingness &&
      Object.keys(this.clearNullValues(event.willingness)).length != 0
    ) {
      let valueCriteriaWillingness = Object.keys(event.willingness).toString()
      this.concatedObjectFilters = Object.assign({
        ...this.concatedObjectFilters,
        willingness: valueCriteriaWillingness,
      })
    }

    if (
      event.dependents &&
      Object.keys(this.clearNullValues(event.dependents)).length != 0
    ) {
      let valueCriteriaDependents =
        event.dependents.withoutDependents && !event.dependents.withDependents
          ? false
          : event.dependents.withDependents
          ? true
          : console.error('ERROR CRITERIA DEPENDENTS')
      if (event.dependents.withoutDependents != event.dependents.withDependents)
        this.concatedObjectFilters = Object.assign({
          ...this.concatedObjectFilters,
          hasDependents: valueCriteriaDependents,
        })
    }

    if (
      event.vehicle &&
      Object.keys(this.clearNullValues(event.vehicle)).length != 0
    ) {
      let valueCriteriaVehicle =
        event.vehicle.withoutVehicle && !event.vehicle.withVehicle
          ? false
          : event.vehicle.withVehicle
          ? true
          : console.error('ERROR CRITERIA VEHICLE')
      if (event.vehicle.withoutVehicle != event.vehicle.withVehicle)
        this.concatedObjectFilters = Object.assign({
          ...this.concatedObjectFilters,
          hasVehicle: valueCriteriaVehicle,
        })
    }

    if (
      event.youngApprentice &&
      Object.keys(this.clearNullValues(event.youngApprentice)).length != 0
    ) {
      let valueCriteriaYoungApprentice =
        event.youngApprentice.withoutYoungApprentice &&
        !event.youngApprentice.onlyYoungApprentice
          ? false
          : event.youngApprentice.onlyYoungApprentice
          ? true
          : console.error('ERROR CRITERIA YOUNGAPPRENTICE')
      if (
        event.youngApprentice.withoutYoungApprentice !=
        event.youngApprentice.onlyYoungApprentice
      )
        this.concatedObjectFilters = Object.assign({
          ...this.concatedObjectFilters,
          isYoungApprentice: valueCriteriaYoungApprentice,
        })
    }

    if (event.pcd && Object.keys(this.clearNullValues(event.pcd)).length != 0) {
      let valueCriteriaPCD =
        event.pcd.withoutPCD && !event.pcd.withPCD
          ? false
          : event.pcd.withPCD
          ? true
          : console.error('ERROR CRITERIA PCD')
      if (event.pcd.withoutPCD != event.pcd.withPCD)
        this.concatedObjectFilters = Object.assign({
          ...this.concatedObjectFilters,
          isPCD: valueCriteriaPCD,
        })
    }

    Object.keys(event).forEach((eventGroup: any) => {
      if (eventGroup == 'job') {
        this.jobFiltered = this.clearNullValues(event[eventGroup]).jobName

        this.concatedObjectFilters = Object.assign(
          this.concatedObjectFilters,
          this.clearNullValues(event[eventGroup])
        )
        this.paramsToRequest.emit(this.concatedObjectFilters)
      }
    })
  }

  translateMultipleValuesCriteria(form: any, constTranslated: any) {
    let formTemp: any = Object.create(form)
    Object.keys(form).forEach((value) => {
      formTemp[value] = constTranslated[value]
    })
    return formTemp
  }

  clearNullValues(form: any) {
    Object.keys(form).forEach((key) => {
      if (form[key] == null || form[key] == '') delete form[key]
    })
    return form
  }
}
