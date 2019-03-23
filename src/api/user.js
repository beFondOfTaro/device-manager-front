import request from '@/utils/request'
import { API } from '@/constants/api-url'

export function listUser(params) {
  return request({
    url: API.listUser,
    method: 'post',
    data: params
  })
}

export function listRole(params) {
  return request({
    url: API.listRole,
    method: 'post',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: API.addUser,
    method: 'post',
    data: params
  })
}

export function deleteUser(params) {
  return request({
    url: API.deleteUser + params.userId,
    method: 'post'
  })
}

export function updateUser(params) {
  return request({
    url: API.updateUser,
    method: 'post',
    params: params
  })
}
