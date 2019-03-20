<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户名:{{ userInfo.username }}</div>
    <div class="dashboard-text">姓名:{{ userInfo.realName }}</div>
    <div class="dashboard-text">角色:<span v-for="role in userInfo.roleList" :key="role.id">{{ role.name }}</span></div>
    <div class="dashboard-text">管理地点:<span v-for="location in userInfo.locationList" :key="location.id">{{ location.name + ' ' }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
