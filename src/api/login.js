import request from '@/utils/request'

export function login(identifier, credential, identifyType) {
  return request({
    url: '/login',
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
    url: '/user/logout',
    method: 'post'
  })
}
