const device = {
  state: {
    // 已选择的分类id
    selectedCategoryId: null
  },
  // 同步数据变更
  mutations: {
    SET_SELECTED_CATEGORY_ID(state, categoryId) {
      state.selectedCategoryId = categoryId
    }
  },
  // 处理异步数据变更
  actions: {

  }
}

export default device
