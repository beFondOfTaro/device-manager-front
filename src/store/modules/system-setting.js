import {
  SET_CHILDREN_CATEGORIES,
  SET_SELECTED_CATEGORY
} from '@/constants/mutation-types/system-setting-mutation-types'

const systemSetting = {
  namespaced: true,
  state: {
    selectedCategory: null,
    // 所选分类的子分类
    childrenCategories: []
  },
  // 同步数据变更
  mutations: {
    [SET_SELECTED_CATEGORY](state, category) {
      state.selectedCategory = category
    },
    [SET_CHILDREN_CATEGORIES](state, childrenCategories) {
      state.childrenCategories = childrenCategories
    }
  },
  // 处理异步数据变更
  actions: {

  },
  getters: {
    selectedCategory: state => state.selectedCategory,
    childrenCategories: state => state.childrenCategories
  }
}

export default systemSetting
