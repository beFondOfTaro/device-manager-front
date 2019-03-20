<template>
  <div>
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
        label="用户名"/>
      <el-table-column
        prop="realName"
        label="姓名"/>
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
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="listUserRequest.queryPage.pageNum"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="listUserRequest.queryPage.pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
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
      userList: [],
      // 用户总数
      totalCount: 0
    }
  },
  mounted() {
    this.listUser()
  },
  methods: {
    listUser() {
      listUser(this.listUserRequest).then(res => {
        this.userList = res.data.list
        this.totalCount = res.data.total
      })
    },
    // 表格行的css class
    tableRowClassName({ row, rowIndex }) {
      for (let role of row.roleList) {
        if (role.id === '1') {
          return 'sys-admin-row'
        }
      }
      return ''
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.listUserRequest.queryPage.pageSize = val
      this.listUser()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.listUserRequest.queryPage.pageNum = val
      this.listUser()
    }
  }
}
</script>

<style>
  .el-table .sys-admin-row {
    background: oldlace;
  }

  .el-table .normal-row {
    background: #f0f9eb;
  }
</style>
