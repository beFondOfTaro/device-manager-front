import request from '@/utils/request'
import { API } from '@/constants/api-url'

export function login(identifier, credential, identifyType) {
  return request({
    url: API.login,
    method: 'post',
    data: {
      identifier,
      credential,
      identifyType
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
