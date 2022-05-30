import { Job } from './job'

export interface Workfield {
  id: number
  name: string
  colorCode: string
  jobs?: Job[]
}
