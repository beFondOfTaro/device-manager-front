<template>
  <div>
    <el-select v-model="searchParams.locationId" placeholder="请选择">
      <el-option
        :key="-1"
        :label="'全部地点'"
        :value="null"/>
      <el-option
        v-for="item in selections.locationList"
        :key="item.id"
        :label="item.name"
        :value="item.id"/>
    </el-select>
    <el-select v-model="searchParams.brandId" placeholder="请选择">
      <el-option
        :key="-1"
        :label="'全部品牌'"
        :value="null"/>
      <el-option
        v-for="item in selections.brandList"
        :key="item.id"
        :label="item.name"
        :value="item.id"/>
    </el-select>
    <el-select v-model="searchParams.deviceModelId" placeholder="请选择">
      <el-option
        :key="-1"
        :label="'全部型号'"
        :value="null"/>
      <el-option
        v-for="item in selections.deviceModelList"
        :key="item.id"
        :label="item.name"
        :value="item.id"/>
    </el-select>
    <el-select v-model="searchParams.workNatureId" placeholder="请选择">
      <el-option
        :key="-1"
        :label="'全部工作性质'"
        :value="null"/>
      <el-option
        v-for="item in selections.workNatureList"
        :key="item.id"
        :label="item.name"
        :value="item.id"/>
    </el-select>
    <div class="search-key-input">
      检索关键字：<el-input v-model="searchParams.searchKey" placeholder="请输入内容"/>
      <el-button type="primary" @click="doSearch()">查询</el-button>
    </div>
  </div>
</template>

<script>
import { getDeviceSelection } from '@/api/Device'
import { deepCloneObject } from '@/utils/BeanUtil'

export default {
  name: 'DeviceSearchBar',
  data() {
    return {
      selections: {
        categoryList: [],
        brandList: [],
        deviceModelList: [],
        locationList: [],
        workNatureList: [],
        custodianList: []
      },
      searchParams: {
        locationId: null,
        brandId: null,
        deviceModelId: null,
        workNatureId: null,
        searchKey: null
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getDeviceSelection({
        pageSize: 20
      }).then(res => {
        this.selections = res.data
      })
    },
    doSearch() {
      this.$store.commit('device/SET_DEVICE_SEARCH_PARAMS', deepCloneObject(this.searchParams))
    }
  }
}
</script>

<style scoped>
  .search-key-input .el-input{
    max-width: 400px;
  }
</style>
