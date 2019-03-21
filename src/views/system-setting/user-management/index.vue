<template>
  <div>
    <div class="user-list-header"><el-button type="primary" @click="showAddUser">添加用户</el-button></div>
    <user-table/>
    <!--添加用户-->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="closeAddUser"
      title="添加用户"
      width="30%">
      <el-form ref="form" :model="addUserRequest" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="addUserRequest.username"/>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="addUserRequest.roleId" placeholder="请选择角色">
            <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUserRequest.password"/>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="addUserRequest.realName"/>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addUserRequest.phone"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addUserRequest.email"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addUserRequest.address"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import UserTable from '@/views/system-setting/user-management/components/UserTable'
import {addUser, listRole} from '@/api/user'
import { QueryPage } from '@/utils/request'

export default {
  name: 'Index',
  components: {
    UserTable
  },
  data() {
    return {
      // 是否显示添加用户的对话框
      dialogVisible: false,
      addUserRequest: {
        username: '',
        roleId: '',
        password: '',
        realName: '',
        phone: '',
        email: '',
        address: ''
      },
      listRoleRequest: {
        queryPage: new QueryPage()
      },
      roleList: []
    }
  },
  methods: {
    // 显示添加用户
    showAddUser() {
      this.dialogVisible = true
      this.listRole()
    },
    // 关闭添加用户对话框
    closeAddUser(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 添加用户
    addUser() {
      addUser(this.addUserRequest).then(res => {
        this.$message({
          message: '添加成功！',
          type: 'success'
        })
        this.dialogVisible = false
      })
    },
    listRole() {
      listRole(this.listRoleRequest).then(res => {
        this.roleList = res.data.list
      })
    }
  }
}
</script>

<style scoped>
  .user-list-header {
    text-align: right;
    margin-top: 1rem;
  }
</style>
