import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { WorkfieldService } from '@shared/services/workfield.service'
import { ResumeViewComponent } from 'app/manager/resume/components/resume-view/resume-view.component'
import { ResumeService } from 'app/manager/resume/services/resume.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { ToastrService } from 'ngx-toastr'
import { Observable, of, Subscription } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators'

import { ConfirmationForwardingModalComponent } from '../@modal/confirmation-forwarding-modal/confirmation-forwarding-modal.component'

const ITEMS_PER_PAGE = 6

@Component({
  selector: 'ngx-resume-list',
  template: `
    <div class="global-container">
      <header class="forwarding__header">
        <app-page-title [title]="'Novo Encaminhamento'"> </app-page-title>
      </header>
      <div class="modal-background" *ngIf="filterActive.filterContainer"></div>
      <div class="app-filtering">
        <ngx-filtering
          (paramsToRequest)="setParams($event)"
          (filtersName)="setFilters($event)"
          [toReset]="filters.length < 1"
        ></ngx-filtering>
        <div class="search">
          <form [formGroup]="singleFormCriteria">
            <!-- [readonly]="filters.length < 1"
            [value]="singleFormCriteria.get('generalInfo')!.value" -->
            <app-input-search
              [placeholder]="'Digite CPF, nome ou e-mail'"
              (click)="checkDisponibility()"
              (search)="setValueToGeneralInfo($event)"
              [styles]="{ 'min-width': '21rem' }"
            ></app-input-search>
          </form>
        </div>
      </div>
      <span
        style="
    display: block;
    height: 2px;
    margin-top: 2rem;
    margin-bottom: .5rem;
    width: 100%;
    background-color: #979797;"
      ></span>
      <div class="top--content">
        <section class="top--content--left">
          <div class="top--content--left--select-all-container">
            <input
              type="checkbox"
              [checked]="desactiveCheck()"
              (change)="checkAllResumes($event)"
              name=""
              id=""
            />
            <svg
              style="margin-left: 5px;"
              width="13"
              height="6"
              viewBox="0 0 16 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L8 8L14 2"
                stroke="#ACACA9"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <button
            class="top--content--left--open-forwarding"
            (click)="openConfirmationModal()"
            [disabled]="countResumesChecked <= 0"
          >
            GERAR ENCAMINHAMENTO
          </button>
          <button
            class="top--content--left--open-forwarding"
            id="return"
            (click)="redirectToList()"
          >
            IR PARA A LISTAGEM
          </button>
        </section>
        <section
          class="top--content--right"
          *ngIf="pagination$ | async as pagination"
        >
          <h2>
            Mostrando
            <strong>{{ pagination.totalElementPerPage }}</strong>
            de
            <strong>{{ stateResumes.length }}</strong>
            resultados
          </h2>
          <h2>
            Selecionando <strong>{{ countResumesChecked }}</strong> de
            <strong>{{ stateResumes.length }}</strong>
            currículos
          </h2>
        </section>
      </div>

      <div class="data">
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Selecionar</th>
                <th>Nome</th>
                <th>Cargo(s) pretendido(s)</th>
                <th>Situação</th>
                <th>Ação</th>
              </tr>
            </thead>
            <ng-container *ngIf="resumes$ | async as resumes; else selectWork">
              <ng-container *ngIf="!isLoading">
                <tbody
                  *ngIf="resumes.length === 0 && resumes != undefined"
                  class="table-notfound"
                >
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span>Ainda não há currículos registrados!</span>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr *ngFor="let resume of resumes">
                    <td>
                      <span class="thead">Selecionar</span>
                      <span>
                        <input
                          type="checkbox"
                          [checked]="resume.isChecked || false"
                          (change)="resume.isChecked = !resume.isChecked"
                        />
                      </span>
                    </td>
                    <td>
                      <span class="thead">Nome</span>
                      <span id="name">{{ resume.physicalPerson.name }}</span>
                    </td>
                    <td *ngIf="listWorkfield">
                      <span class="thead">Cargo(s) pretendido(s)</span>
                      <div
                        class="job-container"
                        [ngStyle]="{ cursor: 'default' }"
                        *ngIf="
                          findColorAndNameByJobName(
                            getJobSelected(resume.jobs)
                          ) as options
                        "
                      >
                        <div
                          class="job-content-container"
                          [ngStyle]="{
                            'background-color': options.selectedColor
                          }"
                        >
                          <span id="job">{{ options.jobName }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="thead">Situação</span>
                      <span
                        id="situation"
                        [class.active]="resume.statusResume === true"
                      >
                        {{
                          resume.statusResume ? 'Disponível' : 'Indisponível'
                        }}</span
                      >
                    </td>
                    <td>
                      <span class="thead">Ação</span>
                      <span
                        id="see-curriculum"
                        (click)="openViewResumeModal(resume.id)"
                        >ver currículo</span
                      >
                    </td>
                  </tr>
                </tbody>
              </ng-container>
            </ng-container>

            <ng-template #selectWork>
              <tbody class="table-notfound" *ngIf="resumes$ === undefined">
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <span
                      >Selecione um cargo em filtros para exibir a listagem de
                      currículos!</span
                    >
                  </td>
                </tr>
              </tbody>
            </ng-template>

            <ng-container *ngIf="isLoading">
              <tbody>
                <tr *ngFor="let itens of repeat">
                  <td>
                    <ngx-skeleton-loader
                      count="1"
                      appearance="line"
                    ></ngx-skeleton-loader>
                  </td>
                  <td>
                    <ngx-skeleton-loader
                      count="1"
                      appearance="line"
                    ></ngx-skeleton-loader>
                  </td>
                  <td>
                    <ngx-skeleton-loader
                      count="1"
                      appearance="line"
                    ></ngx-skeleton-loader>
                  </td>
                  <td>
                    <ngx-skeleton-loader
                      count="1"
                      appearance="line"
                    ></ngx-skeleton-loader>
                  </td>
                  <td>
                    <ngx-skeleton-loader
                      count="1"
                      appearance="line"
                    ></ngx-skeleton-loader>
                  </td>
                </tr>
              </tbody>
            </ng-container>
          </table>
        </div>
        <div class="bottom--content" *ngIf="pagination$ | async as pagination">
          <button
            [disabled]="pagination.previous == undefined"
            (click)="
              getResumesFromServer(concatedObjectFilters, pagination.previous)
            "
          >
            Anterior
          </button>
          <span *ngIf="pagination.current">
            {{ pagination.current }}
          </span>
          <button
            [disabled]="pagination.next == undefined"
            (click)="
              getResumesFromServer(concatedObjectFilters, pagination.next)
            "
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./resume-list.component.scss'],
})
export class NgxResumeListComponent implements OnInit {
  resumes$?: Observable<any[]>
  pagination$?: Observable<any>
  pageSize: number = this.verifyPageSize()
  isLoading: boolean = false
  singleFormCriteria: FormGroup = this.fb.group({
    generalInfo: [null],
  })
  concatedObjectFilters: any = {}
  jobFiltered = ''
  isSelectedAll = false
  filters: string[] = []
  stateResumes: any[] = []
  repeat = Array(4)
  filterActive = {
    filterContainer: false,
  }
  workfields$!: Observable<any>
  listWorkfield!: any[]
  selectedJobColor?: string
  singleResumeJobApplications: any[] = []
  inputSubscription: Subscription = new Subscription()
  constructor(
    private resumeService: ResumeService,
    private fb: FormBuilder,
    private modalService: NgxModalService,
    private workfieldService: WorkfieldService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  clearNullValues(form: any) {
    Object.keys(form).forEach((key) => {
      if (form[key] == null || form[key] == '') delete form[key]
    })
    return form
  }

  setValueToGeneralInfo(value: any) {
    if (this.concatedObjectFilters.jobName)
      this.singleFormCriteria.get('generalInfo')!.patchValue(value)
    else {
      this.resetResumeProperties()
    }
  }

  ngOnDestroy(): void {
    this.resetResumeProperties()
    this.filters = []
  }

  ngOnInit(): void {
    this.onSingleInputChange()
    this.findAllWorkfields()
  }

  verifyPageSize(): number {
    if (document.body.getBoundingClientRect().width < 768) return ITEMS_PER_PAGE
    const contentSizeHeight = document.body.getBoundingClientRect().height * 0.6
    const cardSizeHeight = 80
    return Math.floor(contentSizeHeight / cardSizeHeight)
  }

  checkDisponibility() {
    if (this.jobFiltered === undefined || this.jobFiltered === '')
      this.toastr.warning(
        'Selecione um cargo em filtros para realizar a pesquisa de currículos!',
        'Filtro Indisponível'
      )
  }

  redirectToList() {
    this.router.navigate(['/gerenciador/encaminhamentos'])
  }

  onSingleInputChange() {
    this.inputSubscription.add(
      this.singleFormCriteria.valueChanges
        .pipe(
          distinctUntilChanged(),
          debounceTime(500),
          tap((res) => {
            let filterGeneral = this.filters.find(
              (el) => el == 'Informações Gerais'
            )
            if (res.generalInfo != null) {
              if (res.generalInfo.length <= 3 && filterGeneral != undefined)
                this.filters.splice(
                  this.filters.indexOf(filterGeneral as string),
                  1
                )
              else if (
                res.generalInfo.length >= 3 &&
                filterGeneral == undefined
              )
                this.filters.push('Informações Gerais')
            }
          }),
          map((res) => {
            if (res.generalInfo != '' || res.generalInfo != null)
              this.concatedObjectFilters.generalInfo = res.generalInfo
            else delete this.concatedObjectFilters.generalInfo
            this.getResumesFromServer(this.concatedObjectFilters)
          })
        )
        .subscribe()
    )
  }

  setParams(event: any) {
    this.concatedObjectFilters = event
    this.jobFiltered = this.concatedObjectFilters.jobName || ''
    if (this.jobFiltered != '' || this.jobFiltered)
      this.getResumesFromServer(this.concatedObjectFilters)
    else {
      this.resetResumeProperties()
      this.inputSubscription.unsubscribe()
      this.singleFormCriteria.reset()
    }
  }

  paginateResumes(
    page: number,
    resumes: any[],
    size: number = this.verifyPageSize()
  ) {
    let startIndex = (page - 1) * size
    let endIndex = page * size
    let pagination: any = {}

    if (endIndex < resumes.length) pagination.next = page + 1

    if (startIndex > 0) pagination.previous = page - 1

    pagination.current = page
    pagination.totalElementPerPage = resumes.slice(startIndex, endIndex).length
    this.resumes$ = of(resumes.slice(startIndex, endIndex))
    this.pagination$ = of(pagination)
  }

  resetResumeProperties() {
    this.jobFiltered = ''
    this.resumes$ = undefined
    this.pagination$ = undefined
    this.stateResumes = []
  }

  getResumesFromServer(params?: any, page: number = 1) {
    if (params) {
      this.isLoading = true
      this.resumes$ = this.resumeService
        .findAll('', { ...params, statusResume: true })
        .pipe(
          tap((res: any) => {
            this.isLoading = false
            res.data.forEach(
              (resume: any) => (resume.isChecked = this.isSelectedAll)
            )
            this.stateResumes = res.data
            this.paginateResumes(page, res.data)
          }),
          shareReplay(1),
          map((res) => res.data)
        )
    }
  }

  checkAllResumes(event: any) {
    this.isSelectedAll = event.target.checked
    this.resumes$?.subscribe((resumes) =>
      resumes.forEach((resume) => {
        resume.isChecked = this.isSelectedAll
      })
    )
    this.stateResumes.forEach((resume) => {
      resume.isChecked = this.isSelectedAll
    })
  }

  get countResumesChecked(): number {
    return this.stateResumes.filter((resume) => resume.isChecked).length
  }

  desactiveCheck() {
    if (this.stateResumes.length > 0)
      return this.stateResumes.every((resume) => resume.isChecked)
    else return false
  }

  setFilters(filters: string[]) {
    let checkGeneralInfo = this.filters.find((f) => f == 'Informações Gerais')
    if (checkGeneralInfo) this.filters.push('Informações Gerais')
    this.filters = filters
  }

  translateMultipleValuesCriteria(form: any, constTranslated: any) {
    let formTemp: any = Object.create(form)
    Object.keys(form).forEach((value) => {
      formTemp[value] = constTranslated[value]
    })
    return formTemp
  }

  openConfirmationModal() {
    this.modalService
      .open(ConfirmationForwardingModalComponent, {
        selectedResumes: this.stateResumes.filter((resume) => resume.isChecked),
        jobSelected: this.jobFiltered,
        selectedJobColor: this.selectedJobColor,
      })
      .pipe(switchMap((modal) => modal.onClose))
      .subscribe((data: any) => {
        if (data.selectedResumes.length === 0) {
          this.resetResumeProperties()
          this.filters = []
        }
      })
  }

  openViewResumeModal(resumeId: any) {
    this.modalService
      .open(ResumeViewComponent, {
        resumeId: resumeId,
      })
      .subscribe()
  }

  findAllWorkfields() {
    this.workfieldService
      .findAll()
      .pipe(
        map((res) => res.data),
        tap((res) => (this.listWorkfield = res))
      )
      .subscribe()
  }

  findColorAndNameByJobName(jobName: string) {
    this.selectedJobColor = this.findColors(jobName)
    return { jobName, selectedColor: this.selectedJobColor }
  }

  findAllColorAndJobName(jobNames: string[]) {
    this.singleResumeJobApplications = []
    jobNames.forEach((jobName: string) => {
      let selectedColor = this.findColors(jobName)
      this.singleResumeJobApplications.push({ jobName, selectedColor })
    })
  }

  findColors(jobName: string) {
    let workfields = Array.from(this.listWorkfield)
    let selectedColor = workfields.find((workfield: any) =>
      workfield.jobs.find(
        (job: { id: number; name: string }) => job.name == jobName
      )
    )?.colorCode
    return selectedColor
  }

  // problema -> null
  getJobSelected(jobs: any[]) {
    return jobs.filter((job) => job.name === this.jobFiltered)[0].name
  }
}
