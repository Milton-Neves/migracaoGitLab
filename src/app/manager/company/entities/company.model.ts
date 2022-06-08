import { Address } from '@core/interfaces/physical-person/adress'
import { PhoneNumber } from '@core/interfaces/physical-person/phone-number'
import { Workfield } from '@core/interfaces/resume/workfield'

export interface Company {
  id?: number
  createdBy: Date
  createdAt: Date
  lastModifiedBy: Date
  lastModifiedA: Date
  name: string
  email: string
  cnpj: string
  companyName: string
  amountEmployees: number
  valid: boolean
  workfield: Workfield
  address: Address
  phoneNumbers: PhoneNumber[]
  legalRepresentative: {
    id: number
    name: string
    cellNumber: string
    phoneNumber: string
    email: string
  }
}
