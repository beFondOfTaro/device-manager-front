import { API } from '@/constants/api-url'
import request from '@/utils/request'

export function addRole(params) {
  return request({
    url: API.role.addRole,
    method: 'post',
    data: params
  })
}

export function deleteRole(params) {
  return request({
    url: API.role.deleteRole + params.roleId,
    method: 'post'
  })
}

export function updateRolePermission(params) {
  return request({
    url: API.role.updateRolePermission + params.roleId,
    method: 'post',
    data: params.permissionIdList
  })
}

export function listRoles(params) {
  return request({
    url: API.role.listRoles,
    method: 'post',
    data: params
  })
}

export function listPermissions(params) {
  return request({
    url: API.role.listPermissions,
    data: params
  })
}

export function listPermissionByRoleId(params) {
  return request({
    url: API.role.listPermissionByRoleId,
    method: 'post',
    data: {
      roleId: params.roleId
    }
  })
}
