import { Period } from './period'

export interface Education {
  id: number
  institution: string
  course: string
  isFinished: boolean
  scholarity: string
  period: Period
}
