import { Job } from './job'
import { Period } from './period'

export interface WorkExperiences {
  id: number
  company: string
  isFormal: boolean
  period: Period
  job: Job
}
