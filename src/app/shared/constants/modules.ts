export interface SidebarModule {
  link: string
  iconPath: string
  title: string
}

export const MODULES: SidebarModule[] = [
  {
    link: '/gerenciador',
    iconPath: '../../../../assets/images/icons/sidebar/icone-inicio.svg',
    title: 'Inicio',
  },
  {
    link: '/gerenciador/curriculos',
    iconPath: '../../../../assets/images/icons/sidebar/icone-curriculo.svg',
    title: 'Currículos',
  },
  {
    link: '/gerenciador/empresas',
    iconPath: '../../../../assets/images/icons/sidebar/icone-empresas.svg',
    title: 'Empresas',
  },
  {
    link: '/gerenciador/cargos',
    iconPath: '../../../../assets/images/icons/sidebar/icone-cargos.svg',
    title: 'Cargos',
  },
  {
    link: '/gerenciador/encaminhamentos',
    iconPath:
      '../../../../assets/images/icons/sidebar/icone-encaminhamentos.svg',
    title: 'Encaminhamentos',
  },
  {
    link: '/gerenciador/cargos',
    iconPath: '../../../../assets/images/icons/sidebar/icone-cargos.svg',
    title: 'Cargos',
  },
  {
    link: '/gerenciador/relatorios',
    iconPath: '../../../../assets/images/icons/sidebar/icone-relatorios.svg',
    title: 'Relatórios',
  },
  {
    link: '/gerenciador/usuarios',
    iconPath: '../../../../assets/images/icons/sidebar/icone-usuarios.svg',
    title: 'Usuários',
  },
]
