<template>
  <div>
    <el-cascader
      :options="selections.locationList"
      :props="locationProps"
      v-model="searchParams.locationId"
      :change-on-select="true"
      expand-trigger="hover"
      @change="loadChildrenLocation"/>
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
import { getDeviceSelection, listLocationByPid } from '@/api/device'
import { deepCloneObject } from '@/utils/BeanUtil'
import { QueryPage } from '@/utils/request'

/**
 * 向数组的每一个元素添加children属性，值为[]
 * @param list
 */
function addChildren2ObjectOfList(list) {
  list.forEach(item => {
    item.children = []
    item.loaded = false
  })
}

/**
 * 根据id获取集合以及子集合中的对象
 * @param objectId
 * @param list
 * @returns {*}
 */
function getObjectFromList(objectId, list) {
  if (list === null) {
    return null
  }
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    if (item.id === objectId) {
      return {
        index: i,
        value: item
      }
    }
    let objectFromList = getObjectFromList(objectId, item.children)
    if (objectFromList !== null) {
      return objectFromList
    }
  }
  return null
}

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
        // 由于级联选项卡获取的值为数组，这里定义为数组，并初始化选项卡为null对应的选项
        locationId: [null],
        brandId: null,
        deviceModelId: null,
        workNatureId: null,
        searchKey: null
      },
      locationProps: {
        value: 'id',
        label: 'name',
        children: 'children'
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
        // 添加children属性，以显示选项的展开箭头
        addChildren2ObjectOfList(this.selections.locationList)
        // 添加默认选项
        this.selections.locationList.unshift({
          id: null,
          name: '全部地点',
          children: null,
          // 是否加载过子地点了
          loaded: true
        })
      })
    },
    doSearch() {
      let searchParams = deepCloneObject(this.searchParams)
      searchParams.locationId = searchParams.locationId.pop()
      this.$store.commit('device/SET_DEVICE_SEARCH_PARAMS', searchParams)
    },
    // 加载子地点
    loadChildrenLocation(val) {
      let locationId = val[val.length - 1]
      // 如果已经加载过了，则无需再加载
      let locationObject = getObjectFromList(locationId, this.selections.locationList)
      let location = locationObject.value
      if (location.loaded) {
        return
      }
      // 开始加载子地点
      listLocationByPid({
        locationId: locationId,
        queryPage: new QueryPage()
      }).then(res => {
        // 必须通过vm.$set()来设置children属性，否则无法触发视图更新
        let locationList = this.selections.locationList
        if (res.data.length === 0) {
          location.children = null
        } else {
          addChildren2ObjectOfList(res.data)
          location.children = res.data
        }
        // 设置为已加载状态
        location.loaded = true
        let rootLocation = getObjectFromList(val[0], locationList)
        this.$set(locationList, rootLocation.index, rootLocation.value)
      })
    }
  }
}
</script>

<style scoped>
  .search-key-input .el-input{
    max-width: 400px;
  }
</style>
