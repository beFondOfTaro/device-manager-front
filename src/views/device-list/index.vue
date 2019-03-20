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
          <device-table :category-id="selectedCategoryId" :search-params="deviceSearchParams" :status-id="statusId"/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import DeviceTable from '@/views/device-list/components/DeviceTable'
import CategoryTree from '@/views/device-list/components/CategoryTree'
import DeviceSearchBar from '@/views/device-list/components/DeviceSearchBar'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('device')

export default {
  name: 'DeviceList',
  components: {
    DeviceTable,
    CategoryTree,
    DeviceSearchBar
  },
  props: {
    statusId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'selectedCategoryId',
      'deviceSearchParams'
    ])
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
