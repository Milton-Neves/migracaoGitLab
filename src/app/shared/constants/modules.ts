import { permissions } from './permissions'

export interface SidebarModule {
  link: string
  iconPath: string
  title: string
  canActive: string[]
}

export const MODULES: SidebarModule[] = [
  {
    link: '/gerenciador',
    iconPath: '../../../../assets/images/icons/sidebar/icone-inicio.svg',
    title: 'Inicio',
    canActive: permissions.homePermissions,
  },
  {
    link: '/gerenciador/curriculos',
    iconPath: '../../../../assets/images/icons/sidebar/icone-curriculo.svg',
    title: 'Currículos',
    canActive: permissions.resumePermissions,
  },
  {
    link: '/gerenciador/empresas',
    iconPath: '../../../../assets/images/icons/sidebar/icone-empresas.svg',
    title: 'Empresas',
    canActive: permissions.companyPermissions,
  },
  {
    link: '/gerenciador/cargos',
    iconPath: '../../../../assets/images/icons/sidebar/icone-cargos.svg',
    title: 'Cargos',
    canActive: permissions.workfieldPermissions,
  },
  {
    link: '/gerenciador/encaminhamentos',
    iconPath:
      '../../../../assets/images/icons/sidebar/icone-encaminhamentos.svg',
    title: 'Encaminhamentos',
    canActive: permissions.forwardingPermissions,
  },
  {
    link: '/gerenciador/relatorios',
    iconPath: '../../../../assets/images/icons/sidebar/icone-relatorios.svg',
    title: 'Relatórios',
    canActive: permissions.reportPermissions,
  },
  {
    link: '/gerenciador/usuarios',
    iconPath: '../../../../assets/images/icons/sidebar/icone-usuarios.svg',
    title: 'Usuários',
    canActive: permissions.usersPermissions,
  },
]

function getModules() {}
