<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px">
        <category-tree/>
      </el-aside>
      <el-container>
        <el-header height="80px">
          <device-search-bar/>
        </el-header>
        <el-main>
          <device-table :category-id="selectedCategoryId"/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import DeviceTable from '@/views/device-list/components/DeviceTable'
import CategoryTree from '@/views/device-list/components/CategoryTree'
import DeviceSearchBar from '@/views/device-list/components/DeviceSearchBar'

export default {
  name: 'DeviceList',
  components: {
    DeviceTable,
    CategoryTree,
    DeviceSearchBar
  },
  data() {
    return {
    }
  },
  computed: {
    selectedCategoryId() {
      return this.$store.getters.selectedCategoryId
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
