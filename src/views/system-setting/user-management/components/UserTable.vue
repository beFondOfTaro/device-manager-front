<template>
  <el-table
    :data="userList"
    :row-class-name="tableRowClassName"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id"
      width="180"/>
    <el-table-column
      prop="username"
      label="用户名"
      width="180"/>
    <el-table-column
      prop="realName"
      label="姓名"
      width="180"/>
    <el-table-column
      prop="phone"
      label="手机号"/>
    <el-table-column
      prop="email"
      label="邮箱"/>
    <el-table-column
      label="角色">
      <template slot-scope="scope">
        {{ scope.row.roleList | formatRoles }}
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间">
      <template slot-scope="scope">
        {{ scope.row.createTime | formatCreateTime }}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { QueryPage } from '@/utils/request'
import { listUser } from '@/api/user'
import { getParsedTime } from '@/utils/time'

export default {
  name: 'UserTable',
  filters: {
    formatCreateTime(value) {
      return getParsedTime(value)
    },
    formatRoles(roles) {
      let res = []
      roles.forEach(role => {
        res.push(role.name)
      })
      return res.join('|')
    }
  },
  data() {
    return {
      listUserRequest: {
        queryPage: new QueryPage()
      },
      userList: []
    }
  },
  mounted() {
    this.listUser()
  },
  methods: {
    listUser() {
      listUser(this.listUserRequest).then(res => {
        this.userList = res.data.list
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
