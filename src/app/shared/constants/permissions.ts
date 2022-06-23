import { roles } from './roles'

interface PermissionsProps {
  homePermissions: string[]
  resumePermissions: string[]
  companyPermissions: string[]
  forwardingPermissions: string[]
  workfieldPermissions: string[]
  reportPermissions: string[]
  usersPermissions: string[]
  modulesPermissions: string[]
}

export const permissions: PermissionsProps = {
  homePermissions: [roles.superAdmin, roles.adminSemas, roles.employeeSemas],
  resumePermissions: [roles.superAdmin, roles.adminSemas, roles.employeeSemas],
  companyPermissions: [roles.superAdmin, roles.adminSemas],
  forwardingPermissions: [roles.superAdmin, roles.adminSemas],
  workfieldPermissions: [roles.superAdmin, roles.adminSemas],
  reportPermissions: [roles.superAdmin, roles.adminSemas],
  usersPermissions: [roles.superAdmin, roles.adminSemas],
  modulesPermissions: [roles.superAdmin, roles.adminSemas],
}
