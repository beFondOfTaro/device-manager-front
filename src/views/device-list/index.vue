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
          <div style="text-align: right"><el-button type="primary" @click="addDeviceDialogVisible = true">添加设备</el-button></div>
          <device-table :category-id="selectedCategoryId" :search-params="deviceSearchParams" :status-id="statusId"/>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="addDeviceDialogVisible" title="添加设备">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="校区">
          <el-select v-model="addDeviceRequest.locationId" placeholder="请选择">
            <el-option
              v-for="topLocation in addDeviceDialogData.topLocations"
              :key="topLocation.id"
              :label="topLocation.name"
              :value="topLocation.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="addDeviceRequest.name" placeholder="名称"/>
        </el-form-item>
        <el-form-item label="国资编号">
          <el-input v-model="addDeviceRequest.nationalId" placeholder="国资编号"/>
        </el-form-item>
        <el-form-item label="序列号">
          <el-input v-model="addDeviceRequest.serialNumber" placeholder="序列号"/>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="addDeviceRequest.brandId" placeholder="请选择品牌">
            <el-option
              v-for="brand in addDeviceDialogData.brandList"
              :key="brand.id"
              :label="brand.name"
              :value="brand.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="型号">
          <el-select v-model="addDeviceRequest.deviceModelId" placeholder="请选择型号">
            <el-option
              v-for="deviceModel in addDeviceDialogData.deviceModels"
              :key="deviceModel.id"
              :label="deviceModel.name"
              :value="deviceModel.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="工作性质">
          <el-select v-model="addDeviceRequest.workNatureId" placeholder="请选择工作性质">
            <el-option
              v-for="workNature in addDeviceDialogData.workNatureList"
              :key="workNature.id"
              :label="workNature.name"
              :value="workNature.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="保管人">
          <el-select v-model="addDeviceRequest.custodianId" placeholder="请选择保管人">
            <el-option
              v-for="custodian in addDeviceDialogData.custodianList"
              :key="custodian.id"
              :label="custodian.realName"
              :value="custodian.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="addDeviceRequest.unitPrice" type="number" placeholder="请输入单价"/>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="addDeviceDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="addDevice">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DeviceTable from '@/views/device-list/components/DeviceTable'
import CategoryTree from '@/views/device-list/components/CategoryTree'
import DeviceSearchBar from '@/views/device-list/components/DeviceSearchBar'
import { createNamespacedHelpers } from 'vuex'
import {addDevice, listBrand, listDeviceModel, listLocationByPid, listWorkNature} from '@/api/device'
import { listUser } from '@/api/user'

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
      addDeviceDialogVisible: false,
      addDeviceDialogData: {
        // 顶级地点（校区）
        topLocations: [],
        brandList: [],
        // 设备型号
        deviceModels: [],
        workNatureList: [],
        // 保管人
        custodianList: []
      },
      brandList: [],
      addDeviceRequest: {
        locationId: '',
        // 名称
        name: '',
        // 国资编号
        nationalId: '',
        // 序列号,
        serialNumber: '',
        brandId: '',
        deviceModelId: '',
        workNatureId: '',
        custodianId: '',
        amountUnitId: '1',
        unitPrice: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'selectedCategoryId',
      'deviceSearchParams'
    ])
  },
  mounted() {
    this.initAddDeviceDialog()
  },
  methods: {
    // 初始化添加设备对话框
    initAddDeviceDialog() {
      const QUERY_PAGE = {
        pageSize: 40,
        pageNum: 1
      }
      // 校区选项卡数据
      listLocationByPid({
        locationId: '',
        queryPage: QUERY_PAGE
      }).then(res => {
        this.addDeviceDialogData.topLocations = res.data
        let topLocations = this.addDeviceDialogData.topLocations
        // 设置默认为第一个校区
        if (topLocations.length !== 0) {
          this.addDeviceRequest.locationId = topLocations[0].id
        }
      })
      // 品牌选项卡数据
      listBrand({
        queryPage: QUERY_PAGE
      }).then(res => {
        this.addDeviceDialogData.brandList = res.data.list
      })
      // 设备型号
      listDeviceModel({
        queryPage: QUERY_PAGE
      }).then(res => {
        this.addDeviceDialogData.deviceModels = res.data.list
      })
      // 工作性质
      listWorkNature(QUERY_PAGE).then(res => {
        this.addDeviceDialogData.workNatureList = res.data.list
      })
      // 查询保管人（用户）
      listUser({
        queryPage: QUERY_PAGE
      }).then(res => {
        this.addDeviceDialogData.custodianList = res.data.list
      })
    },
    addDevice() {
      // 设备分类id，直接使用分类树选择的id
      this.addDeviceRequest.categoryIds = [this.selectedCategoryId]
      addDevice(this.addDeviceRequest).then(res => {
        this.$notify({
          title: 'Success',
          message: `添加成功`,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
