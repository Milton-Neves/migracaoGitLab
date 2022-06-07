import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NgxViacepService } from '@brunoc/ngx-viacep'
import { EMPTY, Subscription } from 'rxjs'
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

  constructor(
    private builder: FormBuilder,
    private companyService: CompanyService,
    private viacep: NgxViacepService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  onSubmit() {
    const values = this.form.value as Company

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
      amountEmployees: this.builder.control(0, [Validators.required]),
      workfield: this.builder.control(null, [Validators.required]),
      email: this.builder.control('', [Validators.required]),
      phoneNumbers: this.builder.array([
        {
          number: this.builder.control('', [Validators.required]),
          isOwner: this.builder.control(false, [Validators.required]),
        },
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

  getCEP(cep: any) {
    this.viacep.buscarPorCep(cep).pipe(tap(console.log)).subscribe()
  }

  ngOnDestroy(): void {
    this.serviceubscription.unsubscribe()
  }
}
