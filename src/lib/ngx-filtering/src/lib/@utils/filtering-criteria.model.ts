export enum Scholarity {
  SEM_INSTRUCAO = 'SEM_INSTRUCAO',
  ENSINO_FUNDAMENTAL = 'ENSINO_FUNDAMENTAL',
  ENSINO_FUNDAMENTAL_INCOMPLETO = 'ENSINO_FUNDAMENTAL_INCOMPLETO',
  ENSINO_MEDIO = 'ENSINO_MEDIO',
  ENSINO_MEDIO_INCOMPLETO = 'ENSINO_MEDIO_INCOMPLETO',
  ENSINO_TECNICO = 'ENSINO_TECNICO',
  ENSINO_TECNICO_INCOMPLETO = 'ENSINO_TECNICO_INCOMPLETO',
  GRADUACAO = 'GRADUACAO',
  GRADUACAO_INCOMPLETA = 'GRADUACAO_INCOMPLETA',
  POS_GRADUACAO = 'POS_GRADUACAO',
  POS_GRADUACAO_INCOMPLETA = 'POS_GRADUACAO_INCOMPLETA',
  DOUTORADO = 'DOUTORADO',
  DOUTORADO_INCOMPLETO = 'DOUTORADO_INCOMPLETO',
}

export const criteriaScholarity: any = {
  noInstruction: 'SEM_INSTRUCAO',
  elementarySchool: 'ENSINO_FUNDAMENTAL',
  elementarySchoolIncomplete: 'ENSINO_FUNDAMENTAL_INCOMPLETO',
  secondarySchool: 'ENSINO_MEDIO',
  secondarySchoolIncomplete: 'ENSINO_MEDIO_INCOMPLETO',
  vocationalSchool: 'ENSINO_TECNICO',
  vocationalSchoolIncomplete: 'ENSINO_TECNICO_INCOMPLETO',
  higherEducation: 'GRADUACAO',
  higherEducationIncomplete: 'GRADUACAO_INCOMPLETA',
  postGraduate: 'POS_GRADUACAO',
  postGraduateIncomplete: 'POS_GRADUACAO_INCOMPLETA',
  doctoral: 'DOUTORADO',
  doctoralIncomplete: 'DOUTORADO_INCOMPLETO',
  postDoctoral: 'POS_DOUTORADO',
  postDoctoralIncomplete: 'POS_DOUTORADO_INCOMPLETO',
}

export enum StatusResume {
  ARQUIVADO = 'ARQUIVADO',
  DISPONIVEL = 'DISPONIVEL',
  CONTRATADO = 'CONTRATADO',
  OBITO = 'OBITO',
}

export enum Sex {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
}

export const criteriaSex: any = {
  female: 'FEMININO',
  male: 'MASCULINO',
}

export interface ResumeCriteria {
  statusResume?: StatusResume
  sex?: String
  catA?: boolean
  catB?: boolean
  catC?: boolean
  catD?: boolean
  catE?: boolean
  workExperiences?: boolean
  isPCD?: boolean
  morning?: boolean
  afternoon?: boolean
  night?: boolean
  saturday?: boolean
  sunday?: boolean
  travel?: boolean
  scholarity?: Array<Scholarity>
}
