export interface Address {
  id: number
  city: string
  neighborhood: string
  zipCode: string
  street: string
  number: string
  complement: string
}

export interface PhoneNumber {
  id: number
  number: string
  isOwner: boolean
}

export interface Willingness {
  id: number
  morning: boolean
  afternoon: boolean
  night: boolean
  saturday: boolean
  sunday: boolean
  travel: boolean
}

interface CnhCategory {
  id: number
  catA: boolean
  catB: boolean
  catC: boolean
  catD: boolean
  catE: boolean
}

interface Dependent {
  id: number
  birthDate: string
}

interface Vehicle {
  id: number
  vehicleType: string
}

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
