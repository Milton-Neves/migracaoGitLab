export interface Job {
  id: number
  name: string
  workfield: number
}

export type jobWithoutId = Omit<Job, 'id'>
