import { PhysicalPersonProps } from './physical-person.model'

export interface Archiving {
  id: number
  motive: String
  responsible: String
}
export interface ExtraActivity {
  id: number
  title: string
  description: string
  location: string
  workload: string
  conclusion: string
  pathFile: string
}

export interface WorkExperiences {
  id: number
  company: string
  isFormal: boolean
  period: Period
  job: Job
}

export interface JobApplications {
  id: number
  job: Job
}

export interface Period {
  start: any
  end: any
}
export interface Language {
  id: number
  title: string
  proficiency: string
}

export interface Job {
  id: number
  name: string
  workfield: number
}

export interface Workfield {
  id: number
  name: string
  colorCode: string
  jobs?: Job[]
}
export interface JobApplication {
  id: number
  job: Job
}

export interface Education {
  id: number
  institution: string
  course: string
  isFinished: boolean
  scholarity: string
  period: Period
}
export interface Attachment {
  id: number
  pathFile: string
}

export interface Forwarding {
  id: string
}

export interface Hirement {
  forwarding: Forwarding
}

export interface HirementResume {
  isHired: boolean
  hirement: Hirement
}

export interface ResumeProps {
  isChecked?: boolean
  createdBy?: any
  createdAt?: any
  lastModifiedBy?: any
  lastModifiedAt?: any
  id: number
  presentation?: string
  pathFile?: string
  statusResume: boolean
  archiving?: any
  jobs: Job[]
  attachments: Attachment[]
  physicalPerson: PhysicalPersonProps
  extraActivities: ExtraActivity[]
  languages: Language[]
  workExperiences: WorkExperiences[]
  jobApplications: JobApplication[]
  educations: Education[]
  hirementResumes?: HirementResume[]
}
