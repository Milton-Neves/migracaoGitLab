import { Job } from './job'

export interface Workfield {
  id: number
  name: string
  jobs?: Job[]
}
