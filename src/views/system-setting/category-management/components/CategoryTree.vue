<template>
  <div>
    <el-tree
      v-loading="loading"
      ref="categoryTree"
      :props="defaultProps"
      :load="loadNode"
      node-key="id"
      lazy
      @node-click="handleNodeClick"/>
  </div>
</template>

<script>
import { QueryPage } from '@/utils/request'
import { listCategoryByPId } from '@/api/device'
import {
  SET_CHILDREN_CATEGORIES,
  SET_SELECTED_CATEGORY
} from '@/constants/mutation-types/system-setting-mutation-types'

export default {
  name: 'CategoryTree',
  data() {
    return {
      defaultProps: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      loading: false
    }
  },
  mounted() {
  },
  methods: {
    // 加载节点
    loadNode(node, resolve) {
      // 初始化树节点
      if (node.level === 0) {
        this.loading = true
        listCategoryByPId({
          queryPage: new QueryPage(),
          parentId: ''
        }).then(res => {
          resolve(res.data)
          this.loading = false
          this.$store.commit('systemSetting/' + SET_CHILDREN_CATEGORIES, res.data)
        })
      } else {
        // 加载子节点
        listCategoryByPId({
          queryPage: new QueryPage(),
          parentId: node.data.id
        }).then(res => {
          resolve(res.data)
          this.$store.commit('systemSetting/' + SET_CHILDREN_CATEGORIES, res.data)
        })
      }
    },
    // 由于子节点懒加载，第二次展开同一个节点时不会load，需要重新提交选择的节点信息
    handleNodeClick(data) {
      let node = this.$refs.categoryTree.getNode(data)
      this.$store.commit('systemSetting/' + SET_SELECTED_CATEGORY, node.data)
      let children = []
      node.childNodes.forEach(item => children.push(item.data))
      this.$store.commit('systemSetting/' + SET_CHILDREN_CATEGORIES, children)
    }
  }
}
</script>

<style scoped>

</style>
