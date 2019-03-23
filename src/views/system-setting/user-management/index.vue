<template>
  <div>
    <div class="user-list-header"><el-button type="primary" @click="showAddUser">添加用户</el-button></div>
    <user-table ref="userTable"/>
    <!--添加用户-->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="closeAddUser"
      title="添加用户"
      width="30%">
      <el-form ref="addUserForm" :model="addUserRequest" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserRequest.username"/>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="addUserRequest.roleId" placeholder="请选择角色">
            <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserRequest.password" type="password"/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="addUserRequest.realName"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addUserRequest.phone"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserRequest.email"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addUserRequest.address"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('addUserForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import UserTable from '@/views/system-setting/user-management/components/UserTable'
import { addUser, listRole } from '@/api/user'
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
        // 用户名
        username: '',
        // 角色id
        roleId: '',
        // 密码
        password: '',
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
      // 表单验证规则
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
    addUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUser(this.addUserRequest).then(res => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.dialogVisible = false
            // 重置表单
            this.$refs[formName].resetFields()
            this.$refs.userTable.listUser()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    listRole() {
      listRole(this.listRoleRequest).then(res => {
        this.roleList = res.data.list
      })
    },
    updateUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUser(this.updateUserRequest).then(res => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.$refs.userTable.listUser()
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

<style scoped>
  .user-list-header {
    text-align: right;
    margin-top: 1rem;
  }
</style>
