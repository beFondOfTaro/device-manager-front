import {
  SET_ADD_DEVICE_CATEGORY_ID,
  SET_DEVICE_SEARCH_PARAMS,
  SET_SELECTED_CATEGORY_ID
} from '@/constants/mutation-types/device-mutation-types'

const device = {
  namespaced: true,
  state: {
    // 已选择的分类id
    selectedCategoryId: null,
    deviceSearchParams: {
      locationId: null,
      brandId: null,
      deviceModelId: null,
      workNatureId: null,
      searchKey: null,
      statusId: null
    },
    // 添加设备
    addDeviceRequest: {
      // 分类树选择的分类id
      categoryId: ''
    }
  },
  // 同步数据变更
  mutations: {
    [SET_SELECTED_CATEGORY_ID](state, categoryId) {
      state.selectedCategoryId = categoryId
    },
    [SET_DEVICE_SEARCH_PARAMS](state, searchParams) {
      state.deviceSearchParams = searchParams
    }
  },
  // 处理异步数据变更
  actions: {

  },
  getters: {
    deviceSearchParams: state => state.deviceSearchParams,
    selectedCategoryId: state => state.selectedCategoryId
  }
}

export default device
