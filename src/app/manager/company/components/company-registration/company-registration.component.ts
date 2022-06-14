import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { EMPTY, Subscription } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { NgxViacepService } from '@brunoc/ngx-viacep'

import { Workfield } from '@core/interfaces/resume/workfield'
import { EnumService } from '@shared/services/enum.service'
import { WorkfieldService } from '@shared/services/workfield.service'
import { Company } from '../../entities/company.model'
import { CompanyService } from '../../services/company.service'

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss'],
})
export class CompanyRegistrationComponent implements OnInit, OnDestroy {
  form!: FormGroup
  amountEmployees: string[] = []
  workfields: Workfield[] = []

  serviceSubscription = new Subscription()
  getWorkfieldsSubscription = new Subscription()
  getAmountEmployeesSubscription = new Subscription()
  zipCodeSubscription = new Subscription()

  constructor(
    private builder: FormBuilder,
    private companyService: CompanyService,
    private viacep: NgxViacepService,
    private enumService: EnumService,
    private workfieldService: WorkfieldService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm()
    this.getWorkfieldsSubscription = this.getWorkfields().subscribe()
    this.getAmountEmployeesSubscription = this.getAmountEmployees().subscribe()
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

  onSubmit() {
    const values = {
      ...this.form.value,
      workfield: JSON.parse(this.form.get('workfield')?.value),
    } as Company

    this.serviceSubscription = this.companyService
      .create(values)
      .pipe(
        map((res) => res),
        catchError(() => EMPTY)
      )
      .subscribe()
  }

  private createForm(): FormGroup {
    return this.builder.group({
      name: this.builder.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      cnpj: this.builder.control('', [
        Validators.required,
        Validators.maxLength(16),
      ]),
      companyName: this.builder.control('', [Validators.required]),
      amountEmployees: this.builder.control('', [Validators.required]),
      workfield: this.builder.control('', [Validators.required]),
      email: this.builder.control('', [Validators.required, Validators.email]),
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
        email: this.builder.control('', [
          Validators.required,
          Validators.email,
        ]),
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

  addNewPhoneNumber(): void {
    this.phoneNumbers.push(
      this.builder.group({
        number: this.builder.control(''),
        isOwner: this.builder.control(false),
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
    this.getWorkfieldsSubscription.unsubscribe()
    this.getAmountEmployeesSubscription.unsubscribe()
    this.zipCodeSubscription.unsubscribe()
  }
}
