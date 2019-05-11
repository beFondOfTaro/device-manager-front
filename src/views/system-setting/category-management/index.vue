<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px">
        <category-tree/>
      </el-aside>
      <el-container>
        <el-main>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ selectedCategory === null ? '全部地点' : selectedCategory.name }}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="openAdd()">添加分类</el-button>
            </div>
            <div v-for="item in childrenCategories" :key="item.id" class="text item">
              {{ item.name }}
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CategoryTree from '@/views/system-setting/category-management/components/CategoryTree'
import { createNamespacedHelpers } from 'vuex'
import { addCategoryByPId } from '@/api/device'

const { mapGetters } = createNamespacedHelpers('systemSetting')

export default {
  name: 'Index',
  components: {
    CategoryTree
  },
  computed: {
    ...mapGetters([
      'selectedCategory',
      'childrenCategories'
    ])
  },
  methods: {
    openAdd() {
      this.$prompt('请输入分类名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: ,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        addCategoryByPId({
          parentId: this.selectedCategory === null ? '' : this.selectedCategory.id,
          name: value
        }).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功: '
          })
        })
      })
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 60%;
  }
</style>
