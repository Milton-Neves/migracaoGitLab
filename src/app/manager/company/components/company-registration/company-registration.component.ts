import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgxViacepService } from '@brunoc/ngx-viacep'
import { Workfield } from '@core/interfaces/resume/workfield'
import { EnumService } from '@shared/services/enum.service'
import { WorkfieldService } from '@shared/services/workfield.service'
import { BehaviorSubject, EMPTY, Subscription } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { Company } from '../../entities/company.model'
import { CompanyService } from '../../services/company.service'

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss'],
})
export class CompanyRegistrationComponent implements OnInit, OnDestroy {
  form!: FormGroup
  serviceubscription = new Subscription()
  amountEmployees: string[] = []
  workfields: Workfield[] = []

  constructor(
    private builder: FormBuilder,
    private companyService: CompanyService,
    private viacep: NgxViacepService,
    private enumService: EnumService,
    private workfieldService: WorkfieldService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm()
    this.getWorkfields()
    this.getAmountEmployees()
  }

  getAmountEmployees() {
    return this.enumService
      .getAmountEmployees()
      .pipe(
        map((response: string[]) => {
          this.amountEmployees = response
        })
      )
      .subscribe()
  }

  getWorkfields() {
    return this.workfieldService
      .findAll()
      .pipe(
        map(({ data }) => data),
        map((workfields: Workfield[]) => {
          this.workfields = workfields
        })
      )
      .subscribe()
  }

  onSubmit() {
    const values = {
      ...this.form.value,
      workfield: JSON.parse(this.form.get('workfield')?.value),
    } as Company

    this.serviceubscription = this.companyService
      .create(values)
      .pipe(
        map((res) => res),
        catchError(() => EMPTY)
      )
      .subscribe()
  }

  private createForm(): FormGroup {
    return this.builder.group({
      name: this.builder.control('', [Validators.required]),
      cnpj: this.builder.control('', [Validators.required]),
      companyName: this.builder.control('', [Validators.required]),
      amountEmployees: this.builder.control(null, [Validators.required]),
      workfield: this.builder.control('', [Validators.required]),
      email: this.builder.control('', [Validators.required]),
      phoneNumbers: this.builder.array([
        this.builder.group({
          number: this.builder.control('', [Validators.required]),
          isOwner: this.builder.control(false, [Validators.required]),
        }),
      ]),
      address: this.builder.group({
        city: this.builder.control('', [Validators.required]),
        neighborhood: this.builder.control('', [Validators.required]),
        zipCode: this.builder.control('', [Validators.required]),
        street: this.builder.control('', [Validators.required]),
        state: this.builder.control('', [Validators.required]),
        number: this.builder.control('', [Validators.required]),
        complement: this.builder.control(''),
      }),
      legalRepresentative: this.builder.group({
        name: this.builder.control('', [Validators.required]),
        cellNumber: this.builder.control('', [Validators.required]),
        email: this.builder.control('', [Validators.required]),
        phoneNumber: this.builder.control('', [Validators.required]),
      }),
    })
  }

  getZipCode() {
    const cep = this.form.get('address.zipCode')?.value

    if (cep !== '') {
      let cepIsValid = /^[0-9]{8}$/

      if (cepIsValid.test(cep)) {
        this.cleanAddressForm()

        this.viacep
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

  get address(): FormGroup {
    return this.form.get('address') as FormGroup
  }

  ngOnDestroy(): void {
    this.serviceubscription.unsubscribe()
  }
}
