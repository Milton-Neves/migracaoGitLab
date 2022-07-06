import { Component, OnInit } from '@angular/core'
import { Archiving } from '@core/interfaces/resume/archiving'
import { Resume } from '@core/interfaces/resume/resume'
import { EnumService } from '@shared/services/enum.service'
import { LegalUserService } from 'app/manager/company/services/legal-user.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { ToastrService } from 'ngx-toastr'
import { iif, Observable, of } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'

import { ResumeService } from '../../services/resume.service'

@Component({
  selector: 'app-archiving-modal',
  templateUrl: './archiving-modal.component.html',
  styleUrls: ['./archiving-modal.component.scss'],
})
export class ArchivingModalComponent implements OnInit {
  resume!: Resume
  motivesArchiving$!: Observable<String[]>
  companies$: Observable<any[]> = of([])
  archivingResume!: Archiving
  searchCompanyName: string = ''
  focus: boolean = false
  constructor(
    private modalService: NgxModalService,
    private enumService: EnumService,
    private legalUserService: LegalUserService,
    private resumeService: ResumeService,
    private toastrService: ToastrService
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
    this.legalUserService
      .findAll('companies')
      .pipe(
        map((res: any) => res.data),
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
        res.filter((company: string) =>
          company.toLowerCase().match(this.searchCompanyName.toLowerCase())
        )
      ),
      mergeMap((listCompanies) =>
        iif(
          () => listCompanies.length <= 0,
          of(['Nenhuma empresa encontrada']),
          of(listCompanies)
        )
      )
    )
  }

  handleForm() {
    if (this.archivingResume.archiving.motive == null) return true
    if (
      this.archivingResume.archiving.motive == 'Contratado(a)' &&
      this.archivingResume.companyName == null
    )
      return true
    return false
  }

  setValueToCompanyName(company: any) {
    if (company != 'Nenhuma empresa encontrada') {
      this.searchCompanyName = company
      this.archivingResume.companyName = company
    } else this.archivingResume.companyName = null
  }

  changeStateFocus() {
    setTimeout(() => {
      this.focus = !this.focus
      this.autoComplete()
      this.companies$
        .pipe(
          tap((_) =>
            _[0] == 'Nenhuma empresa encontrada'
              ? this.toastrService.info(
                  'Não há empresas disponíveis',
                  'Ação indisponível'
                )
              : null
          )
        )
        .subscribe()
    }, 100)
  }
}
