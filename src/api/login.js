import request from '@/utils/request'
import { API } from '@/constants/api-url'

export function login(identifier, credential, identifyType, imageValidationCode, validationToken) {
  return request({
    url: API.login,
    method: 'post',
    data: {
      identifier,
      credential: btoa(credential),
      identifyType,
      imageValidationCode,
      validationToken
    }
  })
}

/**
 * 获取验证码token
 */
export function getValidationToken() {
  return request({
    url: API.getValidationToken,
    method: 'get'
  })
}
