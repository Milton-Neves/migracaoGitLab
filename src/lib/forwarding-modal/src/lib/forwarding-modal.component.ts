import { Component, Input, OnInit } from '@angular/core'
import { ForwardingService } from '@shared/services/forwarding.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

const ITEMS_PER_PAGE = 6

@Component({
  selector: 'ngx-forwarding-modal',
  templateUrl: './forwarding-modal.component.html',
  styleUrls: ['./forwarding-modal.component.scss'],
})
export class NgxForwardingModalComponent implements OnInit {
  @Input() id?: string
  @Input() colorCode?: string
  nextTab: boolean = true
  wantsDeleteForwarding: boolean = false
  wantsFinishForwarding: boolean = false
  forwarding$?: Observable<any>
  forwardingIsFinished: boolean = false
  isHiredLabels = ['CURRENT_FORWARDING', 'OTHER_FORWARDING']
  resumes!: any[]
  resumesToPrint!: any[]
  pageSize: number = this.verifyPageSize()
  searchTerm: string = ''
  stateComplement?: string
  wantsModifyComplement: boolean = false
  complementCharactersLimit = 144
  hasComplementModified: boolean = false
  paginationState = {
    next: 0,
    secondNext: 0,
    current: 0,
    previous: 0,
  }
  allChecked: boolean = false
  hasModified: boolean = false
  stateForwardingResumes!: any[]
  auxForwardingResume: any[] = []
  allResumes: any[] = []
  initialState: boolean = false
  constructor(
    private modalService: NgxModalService,
    private forwardingService: ForwardingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getForwarding()
  }

  verifyChangeComplement(forwarding: any) {
    if (
      forwarding.complement != undefined &&
      forwarding.complement.length > this.complementCharactersLimit
    ) {
      forwarding.complement = forwarding.complement.slice(
        0,
        this.complementCharactersLimit
      )
    }

    forwarding.complement === this.stateComplement
      ? (this.hasComplementModified = false)
      : (this.hasComplementModified = true)
  }

  cancelModifingComplement(forwarding: any) {
    forwarding.complement = this.stateComplement
    this.verifyChangeComplement(forwarding)
  }

  changeTab(firstTab: boolean) {
    if (!this.hasModified && !this.hasComplementModified)
      firstTab == undefined
        ? (this.nextTab = !this.nextTab)
        : (this.nextTab = firstTab)
  }

  closeForwardingModal() {
    this.modalService.close()
  }

  getForwarding() {
    if (this.id === undefined) {
      this.closeForwardingModal()
    } else {
      this.forwarding$ = this.forwardingService.findOne(this.id).pipe(
        map((forwarding) => forwarding.data),
        tap((forwarding) => {
          this.getResume(forwarding.forwardingResumes, forwarding.isFinished)
          this.forwardingIsFinished = forwarding.isFinished
          this.stateComplement = forwarding.complement
          this.allResumes = forwarding.forwardingResumes
          this.auxForwardingResume = JSON.parse(
            JSON.stringify(forwarding.forwardingResumes)
          )
        })
      )
    }
  }

  getResume(data: any[], isFinished: boolean, page?: number) {
    this.resumesToPrint = data.filter((resume) => resume.isSelected)
    if (!this.hasModified && !this.hasComplementModified)
      if (!this.nextTab) {
        this.pagination(
          page,
          data.filter((resume) => resume.isSelected),
          this.pageSize
        )
      } else {
        this.pagination(
          page,
          data.filter((resume) => !resume.isSelected),
          this.pageSize
        )
      }
    else
      this.toastr.warning(
        'Alterações precisam ser salvas antes da próxima ação!',
        undefined,
        {
          progressBar: true,
          closeButton: true,
        }
      )
  }

  getResumesToPrint(firstList: boolean): any[] {
    if (this.forwardingIsFinished) {
      if (firstList)
        return this.resumesToPrint.filter(
          (resume) => this.verifyIfIsHired(resume) === this.isHiredLabels[0]
        )
      else
        return this.resumesToPrint.filter(
          (resume) => this.verifyIfIsHired(resume) !== this.isHiredLabels[0]
        )
    } else {
      if (firstList)
        return this.resumesToPrint.filter(
          (resume) => resume.resume.statusResume
        )
      else
        return this.resumesToPrint.filter(
          (resume) => !resume.resume.statusResume
        )
    }
  }

  saveForwarding(forwarding: any) {
    let modifiedForwarding = JSON.parse(JSON.stringify(forwarding))
    delete modifiedForwarding.lastModifiedAt
    delete modifiedForwarding.createdAt
    modifiedForwarding.forwardingResumes.forEach((forwardingResume: any) => {
      forwardingResume.resume = {
        id: forwardingResume.resume.id,
      }
    })
    if (this.hasModified || this.hasComplementModified)
      this.forwardingService
        .update(modifiedForwarding, `${modifiedForwarding.id}`)
        .pipe(map((res) => res.data))
        .subscribe((res) => {
          this.toastr.success('Encaminhamento salvo com sucesso!', undefined, {
            progressBar: true,
            closeButton: true,
          })
          this.hasModified = false
          this.hasComplementModified = false
          this.wantsModifyComplement = false
          this.stateComplement = forwarding.complement
          this.getResume(forwarding.forwardingResumes, forwarding.isFinished)
          this.stateForwardingResumes = forwarding.forwardingResumes
          this.allResumes = forwarding.forwardingResumes
          this.auxForwardingResume = JSON.parse(
            JSON.stringify(forwarding.forwardingResumes)
          )
          this.initialState = false
        })
    else
      this.toastr.info('Não há alterações a serem salvas!', undefined, {
        progressBar: true,
        closeButton: true,
      })
  }

  selectAllResumes(forwardingResumes: any[], eventInput: any) {
    let event = eventInput.target.value
    if (!this.initialState) {
      this.stateForwardingResumes = JSON.parse(
        JSON.stringify(forwardingResumes)
      )
      this.initialState = true
    }
    forwardingResumes.forEach((forwardingResume: any) => {
      let find = this.stateForwardingResumes.filter(
        (resume) => resume.id == forwardingResume.id
      )
      if (!forwardingResume.isSelected && event) {
        forwardingResume.isSelected = !forwardingResume.isSelected
        if (this.verifyIfIsHired(forwardingResume) === this.isHiredLabels[1]) {
          forwardingResume.isSelected = false
        }
      } else if (find[0].isSelected && !event) {
        forwardingResume.isSelected = find[0].isSelected
      } else if (!event && !find[0].isSelected) {
        forwardingResume.isSelected = false
      }
    })
    this.verifyIfHasModified()
  }

  verifyIfHasModified() {
    let localHasModified = false
    this.allResumes.forEach((resume) => {
      let resumeIndex = this.auxForwardingResume.findIndex(
        (stateResume) => stateResume.id == resume.id
      )

      this.auxForwardingResume[resumeIndex].isSelected === resume.isSelected
        ? null
        : (localHasModified = true)
    })

    this.hasModified = localHasModified
  }

  verifyIfIsHired(forwardingResume: any) {
    let currentForwarding = false
    let otherForwarding = false

    if (this.forwardingIsFinished) {
      forwardingResume.resume.hirementResumes!.forEach(
        (hirementForeach: any) => {
          hirementForeach.hirement.forwarding.id ===
          forwardingResume.forwardingId
            ? (currentForwarding = true)
            : null
        }
      )
      if (!currentForwarding && forwardingResume.isSelected)
        otherForwarding = true
    } else {
      if (!forwardingResume.resume.statusResume) {
        otherForwarding = true
      }
    }

    if (currentForwarding) {
      return this.isHiredLabels[0]
    } else if (otherForwarding) {
      return this.isHiredLabels[1]
    } else {
      return ''
    }
  }

  verifyIfAllCheck(forwarding: any) {
    return forwarding.forwardingResumes.every(
      (resume: any) => resume.isSelected == true
    )
  }

  validateToCloseModal() {
    if (this.hasModified || this.hasComplementModified) {
      let modal = document.getElementById('cancel')
      modal!.style.display = 'flex'
    } else {
      this.modalService.close()
    }
  }

  closeAlert(exit: boolean) {
    let modal = document.getElementById('cancel')
    modal!.style.display = 'none'
    exit ? this.modalService.close() : null
  }
  /**
   * @description Creates new tab to print a specific HTMLElement
   * @returns void
   */
  async print() {
    let mywindow = window.open(
      '',
      'PRINT',
      'height=650,width=900,top=100,left=150,titlebar=0'
    )
    let infos = await document.getElementById('print-hireds')!.innerHTML
    await mywindow?.document.write(infos)

    setTimeout(() => {
      mywindow?.document.close() // necessary for IE >= 10
      mywindow?.focus() // necessary for IE >= 10*/

      mywindow?.print()
      mywindow?.close()
    }, 450)
  }

  pagination(page: number = 1, data: any, maxResumes: number) {
    const startIndex = (page - 1) * maxResumes
    const endIndex = page * maxResumes

    if (endIndex < data.length) {
      this.paginationState.next = page + 1
    } else {
      this.paginationState.next = 0
    }

    this.paginationState.current = page

    if (startIndex > 0) {
      this.paginationState.previous = page - 1
    } else {
      this.paginationState.previous = 0
    }

    if ((page + 1) * maxResumes < data.length) {
      this.paginationState.secondNext = page + 2
    } else {
      this.paginationState.secondNext = 0
    }

    this.resumes = data.slice(startIndex, endIndex)
  }

  onSingleInputChange(forwarding: any, term: string, page?: number) {
    this.searchTerm = term
    if (term != '') {
      if (this.validateEmail(term)) {
        this.getResume(
          forwarding.forwardingResumes.filter((res: any) =>
            res.resume.physicalPerson.email
              .toLowerCase()
              .replace(/\s/g, '')
              .includes(term.toLowerCase().replace(/\s/g, ''))
          ),
          forwarding.isFinished,
          page
        )
      } else if (isNaN(Number.parseInt(term))) {
        this.getResume(
          forwarding.forwardingResumes.filter((res: any) =>
            res.resume.physicalPerson.name
              .toLowerCase()
              .replace(/\s/g, '')
              .includes(term.toLowerCase().replace(/\s/g, ''))
          ),
          forwarding.isFinished,
          page
        )
      } else {
        this.getResume(
          forwarding.forwardingResumes.filter((res: any) =>
            res.resume.physicalPerson.cpf?.includes(term)
          ),
          forwarding.isFinished,
          page
        )
      }
    } else {
      this.getResume(forwarding.forwardingResumes, forwarding.isFinished, page)
    }
  }

  validateEmail(emailField: string) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])/

    if (reg.test(emailField.replace(/\s/g, '')) == false) {
      return false
    }

    return true
  }

  verifyPageSize(): number {
    if (document.body.getBoundingClientRect().width < 780) return ITEMS_PER_PAGE
    const contentSizeHeight =
      document.body.getBoundingClientRect().height * 0.31
    const cardSizeHeight = 78
    return Math.floor(contentSizeHeight / cardSizeHeight)
  }

  convertDate(date: any) {
    if (!date) return
    return date.toLocaleString().slice(0, 10)
  }

  finishForwarding(forwarding: any) {
    if (!this.hasModified && !this.hasComplementModified) {
      this.forwardingService
        .finishForwarding(this.takeOnlySelected(forwarding))
        .subscribe((res: { message: string; data: any }) => {
          this.closeForwardingModal()

          this.toastr.success(res.message, 'Sucesso', { timeOut: 5000 })
          if (res.data.withoutResumes) {
            this.toastr.info(res.data.messageWithoutResumes, 'Aviso!', {
              timeOut: 7500,
            })
          }
          if (res.data.withSomeResumes) {
            this.toastr.warning(res.data.messageWithSomeResumes, 'Atenção!', {
              timeOut: 10000,
            })
          }
        })
    } else {
      this.toastr.warning(
        'Alterações precisam ser salvas antes da próxima ação!',
        undefined,
        {
          progressBar: true,
          closeButton: true,
        }
      )
    }
  }

  takeOnlySelected(currentForwarding: any): any {
    let forwarding: any = JSON.parse(JSON.stringify(currentForwarding))
    let forwarResume = forwarding.forwardingResumes.filter(
      (forwar: any) => forwar.isSelected && forwar.resume.statusResume
    )

    forwarResume.forEach((forwardingResume: any) => {
      forwardingResume.resume = {
        id: forwardingResume.resume.id,
        statusResume: forwardingResume.resume.statusResume,
      }
    })

    delete forwarding.lastModifiedAt
    delete forwarding.createdAt
    forwarding.forwardingResumes = forwarResume
    forwarding = JSON.parse(JSON.stringify(forwarding))
    return forwarding
  }

  deleteForwarding(id: string = '') {
    this.forwardingService.delete(id).subscribe((res) => {
      this.toastr.success('Encaminhamento removido com sucesso!', 'Sucesso')
      this.closeForwardingModal()
    })
  }

  openInNewTab(id: number) {
    localStorage.setItem('id', id.toString())
    window.open('#/empresa/visualizar', '_blank')
  }
}
