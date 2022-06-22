import { Company } from './company'

export interface LegalUser {
  login: string
  password: string
  roles: string[]
  legalPerson: Company
}
