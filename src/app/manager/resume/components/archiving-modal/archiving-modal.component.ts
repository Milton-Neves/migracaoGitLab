import { Component, OnInit } from '@angular/core'
import { Archiving } from '@core/interfaces/resume/archiving'
import { Resume } from '@core/interfaces/resume/resume'
import { EnumService } from '@shared/services/enum.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { iif, Observable, of } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'

import { ResumeService } from '../../services/resume.service'
import { CompanyService } from './../../../company/services/company.service'

@Component({
  selector: 'app-archiving-modal',
  templateUrl: './archiving-modal.component.html',
  styleUrls: ['./archiving-modal.component.scss'],
})
export class ArchivingModalComponent implements OnInit {
  resume!: Resume
  motivesArchiving$!: Observable<String[]>
  companies$!: Observable<any[]>
  archivingResume!: Archiving
  searchCompanyName!: string
  focus: boolean = false
  constructor(
    private modalService: NgxModalService,
    private enumService: EnumService,
    private companyService: CompanyService,
    private resumeService: ResumeService
  ) {}

  closeModalArchiving() {
    this.modalService.close()
  }

  sendArchiving() {
    this.resumeService
      .archivingResume(this.archivingResume)
      .pipe(tap(() => this.closeModalArchiving()))
      .subscribe()
  }

  ngOnInit(): void {
    this.motivesArchiving$ = this.enumService
      .findAll('motive_archiving')
      .pipe(map((res: any) => res as String[]))
    this.companyService
      .findAll()
      .pipe(
        map((res: any) => res.data.content),
        tap((res) => {
          this.companies$ = of(res)
        })
      )
      .subscribe()
    this.archivingResume = {
      companyName: null,
      resumeId: this.resume.id,
      archiving: {
        motive: null,
      },
    }
  }

  autoComplete() {
    this.companies$ = this.companies$.pipe(
      map((res: any) =>
        res.filter((company: { name: string }) =>
          company.name.toLowerCase().match(this.searchCompanyName.toLowerCase())
        )
      ),
      mergeMap((listCompanies) =>
        iif(
          () => listCompanies.length <= 0,
          of([{ name: 'Nenhum empresa encontrada', disabled: true }]),
          of(listCompanies)
        )
      )
    )
  }

  handleForm() {
    if (this.archivingResume.archiving.motive == null) return true
    if (
      this.archivingResume.archiving.motive == 'CONTRATADO' &&
      this.archivingResume.companyName == null
    )
      return true
    return false
  }

  setValueToCompanyName(company: any) {
    if (!company.disabled) {
      this.searchCompanyName = company.name
      this.archivingResume.companyName = company.name
    } else this.archivingResume.companyName = null
  }

  changeStateFocus() {
    setTimeout(() => {
      this.focus = !this.focus
      if (this.searchCompanyName != undefined) this.autoComplete()
    }, 100)
  }
}
