import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Workfield } from '@core/interfaces/resume/workfield'
import { Subscription } from 'rxjs'
import { CompanyService } from '../../services/company.service'
import { NgxViacepService } from '@brunoc/ngx-viacep'
import { EnumService } from '@shared/services/enum.service'
import { WorkfieldService } from '@shared/services/workfield.service'
import { map, tap } from 'rxjs/operators'
import { phoneNumberValidator } from '@shared/validators/phoneNumber.validator'
import { TitleCasePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr'
import { Company } from '../../entities/company.model'

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
})
export class CompanyEditComponent implements OnInit {
  @Input() companyId?: number
  form!: FormGroup
  amountEmployees: string[] = []
  workfields: Workfield[] = []
  closeBySystem: boolean = false

  serviceSubscription = new Subscription()
  getWorkfieldsSubscription = new Subscription()
  getAmountEmployeesSubscription = new Subscription()
  zipCodeSubscription = new Subscription()

  constructor(
    private builder: FormBuilder,
    private companyService: CompanyService,
    private viacep: NgxViacepService,
    private enumService: EnumService,
    private workfieldService: WorkfieldService,
    private modalService: NgxModalService,
    private toastr: ToastrService,
    private titleCasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.form = this.createForm()
    this.getAmountEmployeesSubscription = this.getAmountEmployees().subscribe()
    this.getWorkfieldsSubscription = this.getWorkfields().subscribe()
    this.getWorkfields()
    this.getCompany()
  }

  handleUpdateCompany() {
    const values = this.formatFormFields(this.form.value) as Company

    this.serviceSubscription = this.companyService
      .update(values)
      .subscribe((res) => {
        this.toastr.success('Empresa editada com sucesso!', 'Sucesso')
        this.closeBySystem = true
        this.closeModal()
      })
  }

  getCompany() {
    if (this.companyId == undefined) {
      this.closeModal()
      return
    }
    this.companyService.findOne(`${this.companyId}`).subscribe((res) => {
      this.form.patchValue(res.data)
      this.form.get('workfield')!.setValue(res.data.workfield.name)
      res.data.phoneNumbers.forEach((phoneNumber: any, index: number) => {
        if (index != 0) {
          this.addNewPhoneNumberBySystem(phoneNumber)
        }
      })
    })
  }

  closeModal() {
    this.modalService.close()
  }

  getAmountEmployees() {
    return this.enumService.getAmountEmployees().pipe(
      map((response: string[]) => {
        this.amountEmployees = response
      })
    )
  }

  getWorkfields() {
    return this.workfieldService.findAll().pipe(
      map(({ data }) => data),
      map((workfields: Workfield[]) => {
        this.workfields = workfields
      })
    )
  }

  getZipCode() {
    const cep = this.form.get('address.zipCode')?.value

    if (cep !== '') {
      let cepIsValid = /^[0-9]{8}$/

      if (cepIsValid.test(cep)) {
        this.cleanAddressForm()

        this.zipCodeSubscription = this.viacep
          .buscarPorCep(cep)
          .pipe(tap((address) => this.fillAddress(address)))
          .subscribe()
      }
    }
  }

  fillAddress(address: any) {
    this.address.patchValue({
      city: address.localidade,
      neighborhood: address.bairro,
      street: address.logradouro,
      state: address.uf,
    })
  }

  cleanAddressForm() {
    this.address.patchValue({
      city: '',
      neighborhood: '',
      street: '',
      state: '',
    })
  }

  addNewPhoneNumberBySystem({
    id,
    number,
    isNotOwner,
  }: {
    id: number
    number: string
    isNotOwner: boolean
  }): void {
    this.phoneNumbers.push(
      this.builder.group({
        id: this.builder.control(id),
        number: this.builder.control(number, [Validators.required]),
        isNotOwner: this.builder.control(isNotOwner),
      })
    )
  }

  addNewPhoneNumber(): void {
    this.phoneNumbers.push(
      this.builder.group({
        number: this.builder.control('', [
          Validators.required,
          phoneNumberValidator(),
        ]),
        isNotOwner: this.builder.control(false),
      })
    )
  }

  removePhoneNumber(index: number): void {
    this.phoneNumbers.removeAt(index)
  }

  get phoneNumbers(): FormArray {
    return this.form.get('phoneNumbers') as FormArray
  }

  get address(): FormGroup {
    return this.form.get('address') as FormGroup
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe()
    this.getAmountEmployeesSubscription.unsubscribe()
    this.zipCodeSubscription.unsubscribe()
    this.getWorkfieldsSubscription.unsubscribe()
  }

  private formatFormFields(values: any) {
    return {
      ...values,
      name: this.titleCasePipe.transform(this.form.controls.name.value),
      companyName: this.titleCasePipe.transform(
        this.form.controls.companyName.value
      ),
      workfield: this.workfields.filter((workfield) => {
        return workfield.name === this.form.get('workfield')?.value
      })[0],
      valid: true,
      email: this.form.controls.email?.value.toLowerCase(),
      legalRepresentative: {
        ...this.form.get('legalRepresentative')?.value,
        name: this.titleCasePipe.transform(
          this.form.get('legalRepresentative')?.get('name')?.value
        ),
        email: this.form
          .get('legalRepresentative')
          ?.get('email')
          ?.value.toLowerCase(),
      },
      address: {
        ...this.form.get('address')?.value,
        city: this.titleCasePipe.transform(
          this.form.get('address')?.get('city')?.value
        ),
        neighborhood: this.titleCasePipe.transform(
          this.form.get('address')?.get('neighborhood')?.value
        ),
        street: this.titleCasePipe.transform(
          this.form.get('address')?.get('street')?.value
        ),
        state: this.form.get('address')?.get('state')?.value.toUpperCase(),
        complement: this.titleCasePipe.transform(
          this.form.get('address')?.get('complement')?.value
        ),
      },
    }
  }

  private createForm(): FormGroup {
    return this.builder.group({
      id: this.builder.control(null),
      name: this.builder.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      cnpj: this.builder.control('', [
        Validators.required,
        Validators.maxLength(16),
      ]),
      valid: this.builder.control(true),
      companyName: this.builder.control('', [Validators.required]),
      amountEmployees: this.builder.control('', [Validators.required]),
      workfield: ['', Validators.required],
      email: this.builder.control('', [Validators.required, Validators.email]),
      phoneNumbers: this.builder.array([
        this.builder.group({
          id: this.builder.control(null),
          number: this.builder.control('', [
            Validators.required,
            phoneNumberValidator(),
          ]),
          isNotOwner: this.builder.control(false),
        }),
      ]),
      address: this.builder.group({
        id: this.builder.control(null),
        city: this.builder.control('', [Validators.required]),
        neighborhood: this.builder.control('', [Validators.required]),
        zipCode: this.builder.control('', [Validators.required]),
        street: this.builder.control('', [Validators.required]),
        state: this.builder.control('', [Validators.required]),
        number: this.builder.control('', [Validators.required]),
        complement: this.builder.control(''),
      }),
      legalRepresentative: this.builder.group({
        id: this.builder.control(null),
        name: this.builder.control('', [Validators.required]),
        cellNumber: this.builder.control('', [
          Validators.required,
          phoneNumberValidator(),
        ]),
        email: this.builder.control('', [
          Validators.required,
          Validators.email,
        ]),
        phoneNumber: this.builder.control('', [phoneNumberValidator()]),
      }),
    })
  }
}
