import { Component, Input, OnInit } from '@angular/core'
import { ForwardingService } from '@shared/services/forwarding.service'
import { LegalUserService } from 'app/manager/company/services/legal-user.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { ToastrService } from 'ngx-toastr'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-confirmation-forwarding-modal',
  templateUrl: './confirmation-forwarding-modal.component.html',
  styleUrls: ['./confirmation-forwarding-modal.component.scss'],
})
export class ConfirmationForwardingModalComponent implements OnInit {
  @Input() selectedResumes: any[] = []
  @Input() jobSelected: string = ''
  @Input() selectedJobColor!: string
  currentDate: Date = new Date()
  complement: string = ''
  complementCharactersLimit = 144
  companies$!: Observable<any>
  filteredCompanies$!: Observable<any>
  showAutoComplete: boolean = false
  companyName: string = ''
  companiesList: any[] = []

  constructor(
    private modalService: NgxModalService,
    private forwardingService: ForwardingService,
    private legalUserService: LegalUserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.selectedResumes.length <= 0) {
      this.closeModal()
    }
    this.legalUserService
      .findAll('companies')
      .pipe(
        map((res: any) => res.data),
        tap((res) => {
          this.companiesList = res
          this.filteredCompanies$ = of(
            res.length > 0 ? res : ['Nenhuma empresa encontrada']
          )
        })
      )
      .subscribe()
  }

  verifyChangeComplement() {
    this.complement =
      this.complement.charAt(0).toUpperCase() +
      this.complement.slice(1, this.complement.length)
    if (this.complement.length > this.complementCharactersLimit) {
      this.complement = this.complement.slice(0, this.complementCharactersLimit)
    }
  }

  openCloseDropdown() {
    setTimeout(() => (this.showAutoComplete = !this.showAutoComplete), 100)
  }

  selectCompany(value: string) {
    if (value != 'Nenhuma empresa encontrada') this.companyName = value
  }

  filtering() {
    let filtered = this.companiesList.filter((company) =>
      company.companyName.toLowerCase().match(this.companyName.toLowerCase())
    )
    this.filteredCompanies$ = of(
      filtered.length <= 0 ? ['Nenhuma empresa encontrada'] : filtered
    )
  }

  postForwarding() {
    if (this.jobSelected?.length === 0) {
      this.closeModal()
    } else {
      let resumeList: any[] = []

      this.selectedResumes.forEach((resume) => {
        resumeList.push({ resume: { id: resume.id }, isSelected: false })
      })

      let createForwarding = {
        job: this.jobSelected,
        isFinished: false,
        complement: this.complement,
        companyName: this.companyName,
        forwardingResumes: resumeList,
      }

      this.forwardingService
        .create(createForwarding)
        .pipe(map((forwarding) => forwarding.data))
        .subscribe(() => {
          this.toastr.success('Encaminhamento criado com sucesso.', 'Sucesso')
          this.selectedResumes = []
          this.closeModal()
        })
    }
  }

  closeModal() {
    this.modalService.close()
  }
}