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

/**
 * 根据父id查询子分类
 * @param params
 */
export function listCategoryByPId(params) {
  return request({
    url: API.listCategoryByPId,
    method: 'post',
    data: {
      queryPage: params.queryPage,
      parentId: params.parentId
    }
  })
}

/**
 * 获取添加设备的选项卡数据
 * @param params
 */
export function getDeviceSelection(params) {
  return request({
    url: API.getDeviceSelection + params.pageSize,
    method: 'post'
  })
}

export function listLocationByPid(params) {
  return request({
    url: API.listLocationByPid,
    method: 'post',
    data: {
      parentId: params.locationId,
      queryPage: params.queryPage
    }
  })
}

/**
 * 添加设备
 * @param params
 */
export function addDevice(params) {
  return request({
    url: API.addDevice,
    method: 'post',
    data: params
  })
}

/**
 * 查询品牌列表
 * @param params
 */
export function listBrand(params) {
  return request({
    url: API.listDeviceBrand,
    method: 'post',
    data: params
  })
}

/**
 * 查询设备型号
 * @param params
 */
export function listDeviceModel(params) {
  return request({
    url: API.listDeviceModel,
    method: 'post',
    data: params
  })
}

/**
 * 查询工作性质
 * @param params
 */
export function listWorkNature(params) {
  return request({
    url: API.listWorkNature,
    method: 'post',
    data: params
  })
}
