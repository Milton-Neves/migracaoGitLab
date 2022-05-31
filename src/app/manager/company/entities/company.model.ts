import { Workfield } from '@core/interfaces/resume/workfield'

export interface Company {
  createdBy: Date
  createdAt: Date
  lastModifiedBy: Date
  lastModifiedA: Date
  name: string
  cnpj: string
  companyName: string
  amountEmployees: number
  valid: boolean
  workfield: Workfield
  legalRepresentative: {
    id: number
    name: string
    cellNumber: string
    phoneNumber: string
    email: string
  }
}
