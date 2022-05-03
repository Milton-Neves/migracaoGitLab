import { PhysicalPersonProps } from '../physical-person/physical-person.model'
import { Attachment } from './attachment'
import { Education } from './education'
import { ExtraActivity } from './extra-activity'
import { HirementResume } from './hirement-resume'
import { Job } from './job'
import { JobApplication } from './job-application'
import { Language } from './language'
import { WorkExperiences } from './work-experiences'

export interface Resume {
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
