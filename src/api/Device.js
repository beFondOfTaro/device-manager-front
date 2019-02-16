import request, { QueryPage } from '@/utils/request'
import { API } from '@/constants/api-url'

export class SearchDeviceParams {
  constructor() {
    this.queryPage = new QueryPage()
    this.workNatureId = null // 状态码
    this.locationId = null // 地点id
    this.brandId = null // 品牌id
    this.deviceModelId = null// 设备型号id
  }
}

export function getDeviceList(params) {
  return request({
    url: API.listDevice,
    method: 'post',
    data: params
  })
}
