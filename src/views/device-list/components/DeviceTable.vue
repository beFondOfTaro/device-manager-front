<template>
  <div>
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
          {{ scope.row.brand!==undefined?scope.row.brand.name:'' }}
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
          {{ scope.row.locationStr | topLocationFilter }}
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
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showDeviceDetail(scope.row)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
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
    <el-dialog
      :visible.sync="deviceDetailVisible"
      title="设备信息">
      <el-tabs v-model="activeTabName" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="基本信息" name="baseInfo">
          <el-form label-width="80px" label-position="left">
            <el-form-item label="id">
              {{ deviceRow.id }}
            </el-form-item>
            <el-form-item label="校区">
              {{ deviceRow.locationStr | topLocationFilter }}
            </el-form-item>
            <el-form-item label="使用部门">
              {{ getDepartment(deviceRow.locationStr) }}
            </el-form-item>
            <el-form-item label="名称">
              <span v-if="!deviceDetailData.nameEditable">{{ deviceRow.name }}</span>
              <el-input v-if="deviceDetailData.nameEditable" v-model="updateDeviceRequest.name" placeholder="名称"/>
              <i class="el-icon-edit" @click="deviceDetailData.nameEditable = !deviceDetailData.nameEditable"/>
            </el-form-item>
            <el-form-item label="国资编号">
              <span v-if="!deviceDetailData.nationalIdEditable">{{ deviceRow.nationalId }}</span>
              <el-input v-if="deviceDetailData.nationalIdEditable" v-model="updateDeviceRequest.nationalId" placeholder="国资编号"/>
            </el-form-item>
            <el-form-item label="序列号">
              <span v-if="!deviceDetailData.serialNumberEditable">{{ deviceRow.serialNumber }}</span>
              <el-input v-if="deviceDetailData.serialNumberEditable" v-model="updateDeviceRequest.serialNumber" placeholder="序列号"/>
            </el-form-item>
            <el-form-item label="品牌">
              <span v-if="!deviceDetailData.brandEditable">{{ deviceRow.brand!==undefined?deviceRow.brand.name:'' }}</span>
              <el-select v-if="deviceDetailData.brandEditable" v-model="updateDeviceRequest.brandId" placeholder="请选择品牌">
                <el-option
                  v-for="brand in addDeviceDialogData.brandList"
                  :key="brand.id"
                  :label="brand.name"
                  :value="brand.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="型号">
              <span v-if="!deviceDetailData.deviceModelEditable">{{ deviceRow.deviceModel }}</span>
              <el-select v-if="deviceDetailData.deviceModelEditable" v-model="updateDeviceRequest.deviceModelId" placeholder="请选择型号">
                <el-option
                  v-for="deviceModel in addDeviceDialogData.deviceModels"
                  :key="deviceModel.id"
                  :label="deviceModel.name"
                  :value="deviceModel.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="工作性质">
              <span v-if="!deviceDetailData.workNatureEditable">{{ deviceRow.workNature }}</span>
              <el-select v-if="deviceDetailData.workNatureEditable" v-model="updateDeviceRequest.workNatureId" placeholder="请选择工作性质">
                <el-option
                  v-for="workNature in addDeviceDialogData.workNatureList"
                  :key="workNature.id"
                  :label="workNature.name"
                  :value="workNature.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="保管人">
              <span v-if="!deviceDetailData.custodianEditable">{{ deviceRow.custodian }}</span>
              <el-select v-if="deviceDetailData.custodianEditable" v-model="updateDeviceRequest.custodianId" placeholder="请选择保管人">
                <el-option
                  v-for="custodian in addDeviceDialogData.custodianList"
                  :key="custodian.id"
                  :label="custodian.realName"
                  :value="custodian.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="单价">
              <span v-if="!deviceDetailData.unitPriceEditable">{{ deviceRow.unitPrice }}</span>
              <el-input v-if="deviceDetailData.unitPriceEditable" v-model="updateDeviceRequest.unitPrice" type="number" placeholder="请输入单价"/>
            </el-form-item>
            <el-form-item label="备注">
              <span v-if="!deviceDetailData.descriptionEditable">{{ deviceRow.description }}</span>
              <el-input v-if="deviceDetailData.descriptionEditable" v-model="updateDeviceRequest.description" type="text" placeholder="无"/>
            </el-form-item>
            <el-form-item label="状态">
              <el-tag :type="deviceRow.statusId | statusFilter">{{ parseStatus(deviceRow.statusId) }}</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="状态记录" name="statusRecord">
          <el-table
            :data="deviceStatusRecords"
            element-loading-text="Loading"
            size="small"
            border
            fit
            highlight-current-row>
            <el-table-column align="center" label="ID">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="原始状态" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.fromStatus != -1" :type="scope.row.fromStatus | statusFilter">{{ parseStatus(scope.row.fromStatus) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="当前状态" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.toStatus | statusFilter">{{ parseStatus(scope.row.toStatus) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="当前地点">
              <template slot-scope="scope">
                {{ scope.row.toLocation }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="变更时间">
              <template slot-scope="scope">
                {{ scope.row.operateTime | timeFilter }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作人员">
              <template slot-scope="scope">
                {{ scope.row.operateUserRealName }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="二维码" name="QRCode">
          <img :src="QRCodeUrl">
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deviceDetailVisible = false">取 消</el-button>
        <el-button type="primary" @click="deviceDetailVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceList, getDeviceStatusRecord, SearchDeviceParams } from '@/api/device'
import { getParsedTime } from '@/utils/time'
import { DEVICE_STATUS, DeviceStatus } from '@/constants/device-status'
import QRCode from 'qrcode'
import { QueryPage } from '@/utils/request'

let defaultDeviceRow = {
  'id': '0',
  'name': '',
  'nationalId': '',
  'serialNumber': '',
  'useTime': 0,
  'unitPrice': 0,
  'statusId': DEVICE_STATUS.IN_STORAGE.code,
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
  'deviceModel': '',
  description: ''
}

export default {
  name: 'DeviceTable',
  filters: {
    // 设备状态过滤器
    statusFilter(status) {
      const statusMap = {}
      statusMap[DEVICE_STATUS.IN_STORAGE.code] = 'success'
      statusMap[DEVICE_STATUS.USING.code] = 'gray'
      statusMap[DEVICE_STATUS.DISCARDED.code] = 'danger'
      return statusMap[status]
    },
    topLocationFilter(locationStr) {
      return locationStr.split('/')[0]
    },
    timeFilter(timestamp) {
      return getParsedTime(timestamp)
    }
  },
  props: {
    // 分类树选择的分类id
    categoryId: {
      type: String,
      default: null
    },
    // 设备搜索参数
    searchParams: {
      type: Object,
      default() {
        return {
          locationId: null,
          brandId: null,
          deviceModelId: null,
          workNatureId: null,
          searchKey: ''
        }
      }
    },
    // 设备搜索参数，设备状态
    statusId: {
      type: Number,
      default: null
    },
    addDeviceDialogData: {
      type: Object,
      default() {
        return {
          // 顶级地点（校区）
          topLocations: [],
          brandList: [],
          // 设备型号
          deviceModels: [],
          workNatureList: [],
          // 保管人
          custodianList: []
        }
      }
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      deviceList: [
        defaultDeviceRow
      ],
      // 设备总量
      deviceTotal: 0,
      // 设备搜索参数
      searchDeviceParams: new SearchDeviceParams(),
      // 是否显示设备详情
      deviceDetailVisible: false,
      deviceDetailData: {
        nameEditable: false,
        nationalIdEditable: false,
        serialNumberEditable: false,
        brandEditable: false,
        deviceModelEditable: false,
        workNatureEditable: false,
        custodianEditable: false,
        unitPriceEditable: false,
        descriptionEditable: false
      },
      updateDeviceRequest: {

      },
      // 查看的单个设备信息
      deviceRow: defaultDeviceRow,
      // 当前激活的tab名
      activeTabName: 'baseInfo',
      // 二维码url
      QRCodeUrl: '',
      deviceStatusRecords: []
    }
  },
  watch: {
    categoryId(newId, oldId) {
      this.searchDeviceParams.categoryId = newId
      this.fetchData()
    },
    searchParams: {
      handler(newParams, oldParams) {
        this.searchDeviceParams.locationId = newParams.locationId
        this.searchDeviceParams.brandId = newParams.brandId
        this.searchDeviceParams.deviceModelId = newParams.deviceModelId
        this.searchDeviceParams.workNatureId = newParams.workNatureId
        this.searchDeviceParams.queryKey = newParams.searchKey
        this.fetchData()
      },
      deep: true
    }
  },
  created() {
    this.searchDeviceParams.statusId = this.statusId
    this.fetchData()
    // 生成二维码
    this.generateQRCode()
  },
  methods: {
    // 获取设备列表
    fetchData() {
      this.listLoading = true
      getDeviceList(this.searchDeviceParams).then(response => {
        this.list = response.data.list
        this.deviceTotal = response.data.total
        this.listLoading = false
      })
    },
    getDepartment: function(locationStr) {
      let startIndex = locationStr.indexOf('/')
      if (startIndex === -1) {
        return ''
      }
      return locationStr.substring(startIndex + 1, locationStr.length)
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
      if (status === -1) {
        return ''
      }
      return DeviceStatus.getByCode(status).value
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
    },
    // 显示设备详情
    showDeviceDetail(row) {
      this.deviceDetailVisible = true
      this.deviceRow = row
      this.getDeviceStatusRecord(this.deviceRow.id)
    },
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    generateQRCode() {
      QRCode.toDataURL('https://www.baidu.com')
        .then(url => {
          this.QRCodeUrl = url
        })
        .catch(err => {
          console.error(err)
        })
    },
    getDeviceStatusRecord(deviceId) {
      getDeviceStatusRecord({
        deviceId: deviceId,
        queryPage: new QueryPage()
      }).then(res => {
        this.deviceStatusRecords = res.data.list
      })
    }
  }
}
</script>

<style scoped>

</style>
