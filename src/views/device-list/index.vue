<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="180">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="设备名称" width="180">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="类别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.categoryStr }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="searchDeviceParams.statusId!=1" label="使用部门" width="110" align="center">
        <template slot-scope="scope">
          {{ getDepartment(scope.row.locationStr) }}
        </template>
      </el-table-column>
      <el-table-column label="设备品牌" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.brand!==undefined?scope.row.brand.name:'未填写' }}
        </template>
      </el-table-column>
      <el-table-column label="设备型号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.deviceModel }}
        </template>
      </el-table-column>
      <el-table-column label="国资编号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.nationalId }}
        </template>
      </el-table-column>
      <el-table-column label="序列号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.serialNumber }}
        </template>
      </el-table-column>
      <el-table-column label="所在校区" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationStr.split('/')[0] }}
        </template>
      </el-table-column>
      <el-table-column v-if="searchDeviceParams.statusId!=1" align="center" prop="created_at" label="领用时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ formatTime(scope.row.useTime,scope.row.statusId) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作性质" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.workNature }}
        </template>
      </el-table-column>
      <el-table-column label="保管人" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.custodian }}
        </template>
      </el-table-column>
      <el-table-column label="单价（元）" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.unitPrice }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.statusId | statusFilter">{{ parseStatus(scope.row.statusId) }}</el-tag>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      :current-page="searchDeviceParams.queryPage.pageNum"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="searchDeviceParams.queryPage.pageSize"
      :total="deviceTotal"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { getDeviceList, SearchDeviceParams } from '@/api/Device'
import { getParsedTime } from '@/utils/time'

export default {
  name: 'DeviceList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'gray',
        3: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      deviceList: [
        {
          'id': '0',
          'name': '',
          'nationalId': '',
          'serialNumber': '',
          'useTime': 0,
          'unitPrice': 0,
          'statusId': 0,
          'createTime': 0,
          'updateTime': 0,
          'brand': {
            'id': '0',
            'name': ''
          },
          'locationStr': '',
          'categoryStr': '',
          'workNature': '',
          'custodian': '',
          'amountUnit': '',
          'useDepartment': '',
          'deviceModel': ''
        }
      ],
      // 设备总量
      deviceTotal: 0,
      searchDeviceParams: new SearchDeviceParams()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getDeviceList(this.searchDeviceParams).then(response => {
        this.list = response.data.list
        this.deviceTotal = response.data.total
        this.listLoading = false
      })
    },
    getDepartment: function(locationStr) {
      return locationStr.substring(locationStr.indexOf('/') + 1, locationStr.length)
    },
    // 设备格式化时间
    formatTime: function(timestamp, deviceStatusId) {
      return deviceStatusId === 1 ? '' : getParsedTime(timestamp)
    },
    /**
     * 解析设备状态
     * @param status 状态吗
     * @returns {*}中文释义
     */
    parseStatus: function(status) {
      switch (status) {
        case 1:
          return '入库'
        case 2:
          return '使用中'
        case 3:
          return '报废'
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.searchDeviceParams.queryPage.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.searchDeviceParams.queryPage.pageNum = val
      this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>
