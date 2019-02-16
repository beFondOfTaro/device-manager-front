<template>
  <div>
    <el-tree
      ref="categoryTree"
      :props="defaultProps"
      :load="loadNode"
      node-key="id"
      lazy/>
  </div>
</template>

<script>
import { QueryPage } from '@/utils/request'
import { listCategoryByPId } from '@/api/Device'

export default {
  name: 'CategoryTree',
  data() {
    return {
      defaultProps: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  mounted() {
  },
  methods: {
    // 加载节点
    loadNode(node, resolve) {
      // 初始化树节点
      if (node.level === 0) {
        listCategoryByPId({
          queryPage: new QueryPage(),
          parentId: ''
        }).then(res => {
          resolve(res.data)
        })
      } else {
        // 加载子节点
        listCategoryByPId({
          queryPage: new QueryPage(),
          parentId: node.data.id
        }).then(res => {
          resolve(res.data)
        })
        this.$store.commit('SET_SELECTED_CATEGORY_ID', node.data.id)
      }
    }
  }
}
</script>

<style scoped>

</style>
