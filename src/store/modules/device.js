import { SET_DEVICE_SEARCH_PARAMS, SET_SELECTED_CATEGORY_ID } from '@/constants/mutation-types/device-mutation-types'

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
      searchKey: null
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
