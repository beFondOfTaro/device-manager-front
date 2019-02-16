<template>
  <div class="app-container">
    <el-container>
      <el-aside>
        <category-tree/>
      </el-aside>
      <el-main>
        <device-table :category-id="selectedCategoryId"/>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import DeviceTable from '@/views/device-list/components/DeviceTable'
import CategoryTree from '@/views/device-list/components/CategoryTree'

export default {
  name: 'DeviceList',
  components: {
    DeviceTable,
    CategoryTree
  },
  data() {
    return {
      selectedCategoryId: null
    }
  },
  mounted() {
    this.selectedCategoryId = this.$store.getters.selectedCategoryId
  }
}
</script>

<style scoped>

</style>
