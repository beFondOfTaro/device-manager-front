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
          <el-button type="text" size="small" @click="showUpdateDialog(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row.id, scope.row.username)">删除</el-button>
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

    <el-dialog
      :visible.sync="updateDialogVisible"
      title="修改用户"
      width="30%">
      <el-form ref="updateUserForm" :model="updateUserRequest" :rules="rules" :disabled="!updateEditable" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="updateUserRequest.username"/>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="updateUserRequest.roleId" placeholder="请选择角色">
            <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="updateUserRequest.realName"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="updateUserRequest.phone"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateUserRequest.email"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="updateUserRequest.address"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button v-if="updateEditable" type="primary" @click="updateUser('updateUserForm')">保存</el-button>
        <el-button v-if="!updateEditable" type="primary" @click="updateEditable = true; updateUserRequest.password=''">编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { QueryPage } from '@/utils/request'
import { deleteUser, listRole, listUser, updateUser } from '@/api/user'
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
      totalCount: 0,
      // 是否显示修改用户的对话框
      updateDialogVisible: false,
      // 修改用户对话框是否可编辑
      updateEditable: false,
      // 修改用户
      updateUserRequest: {
        // 用户名
        username: '',
        // 角色id
        roleId: '',
        // 真实姓名
        realName: '',
        phone: '',
        email: '',
        address: ''
      },
      listRoleRequest: {
        queryPage: new QueryPage()
      },
      roleList: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 16, message: '最长为16个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { type: 'string', pattern: /\d{11}/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.listUser()
  },
  methods: {
    listUser() {
      listUser(this.listUserRequest.queryPage).then(res => {
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
    },
    // 删除用户
    deleteUser(userId, username) {
      this.$confirm('确定删除用户:' + username + ' 吗？')
        .then(() => {
          deleteUser({ userId }).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.listUser()
          })
        })
    },
    listRole() {
      listRole(this.listRoleRequest).then(res => {
        this.roleList = res.data.list
      })
    },
    showUpdateDialog(userInfo) {
      // 设置表单内容
      this.updateUserRequest = userInfo
      this.updateUserRequest.password = '1111111'
      this.updateUserRequest.roleId = userInfo.roleList[0]
      // 显示对话框
      this.updateDialogVisible = true
      // 移除表单检验结果
      let updateUserForm = this.$refs.updateUserForm
      if (updateUserForm != null) {
        updateUserForm.clearValidate()
      }
      // 表单不可编辑
      this.updateEditable = false
      this.listRole()
    },
    // 修改用户
    updateUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUser(this.updateUserRequest).then(res => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.listUser()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
