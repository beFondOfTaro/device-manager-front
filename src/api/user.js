import request from '@/utils/request'
import { API } from '@/constants/api-url'

export function listUser(params) {
  return request({
    url: API.listUser,
    method: 'post',
    data: params
  })
}
