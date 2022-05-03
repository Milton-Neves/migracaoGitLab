import { Address } from './adress'
import { PhoneNumber } from './phone-number'
import { Willingness } from './willingness'
import { Vehicle } from './vehicle'
import { Dependent } from './dependent'
import { CnhCategory } from './cnh-category'

export interface PhysicalPersonProps {
  createdBy?: any
  createdAt?: any
  lastModifiedBy?: any
  lastModifiedAt?: any
  id: number
  name: string
  email: string
  address?: Address
  phoneNumbers: PhoneNumber[]
  cpf?: string
  rg?: string
  sex?: string
  maritalStatus?: string
  birthDate?: string
  isYoungApprentice?: boolean
  isPCD?: boolean
  disability: string
  additionalInformation?: string
  // physicalUser?: PhysicalUserProps
  willingness?: Willingness
  hasCNH?: boolean
  cnhCategory?: CnhCategory
  dependents?: Dependent[]
  vehicles?: Vehicle[]
}
