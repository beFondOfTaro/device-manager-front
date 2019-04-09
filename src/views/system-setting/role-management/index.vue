<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">添加角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="id" width="220">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="Role Name" width="220">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑权限</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="权限">
          <el-tree ref="tree" :check-strictly="checkStrictly" :data="permissions" :props="defaultProps" show-checkbox node-key="id" class="permission-tree" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepCloneObject } from '@/utils/BeanUtil'
import { listPermissions, listRoles, addRole, deleteRole, updateRolePermission, listPermissionByRoleId } from '@/api/role'
import { QueryPage } from '@/utils/request'
const defaultRole = {
  id: '',
  name: '',
  permissions: []
}
export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      rolesList: [],
      permissions: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'permissionName'
      },
      listRoleRequest: {
        queryPage: new QueryPage()
      }
    }
  },
  computed: {
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getPermissions()
    this.getRoles()
  },
  methods: {
    async getPermissions() {
      const res = await listPermissions()
      this.permissions = this.generatePermissionTree(res.data)
    },
    async getRoles() {
      const res = await listRoles(this.listRoleRequest)
      this.rolesList = res.data.list
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepCloneObject(scope.row)
      listPermissionByRoleId({ roleId: this.role.id }).then(res => {
        this.role.permissions = res.data
        this.$refs.tree.setCheckedNodes(this.role.permissions.map(permission => permission.id))
        this.$nextTick(() => {
          // set checked state of a node not affects its father and child nodes
          this.checkStrictly = false
        })
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole({
            roleId: row.id
          })
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      if (isEdit) {
        await updateRolePermission({
          roleId: this.role.id,
          permissionIdList: checkedKeys
        })
      } else {
        await addRole({
          name: this.role.name,
          permissionIdList: checkedKeys,
          locationIds: []
        })
      }
      const { id, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${id}</div>
            <div>Role Nmae: ${name}</div>
          `,
        type: 'success'
      })
    },
    // 生成权限树
    generatePermissionTree(originPermissions, checkedKeys) {
      let permissionTree = []
      originPermissions.forEach(originPermission => {
        let permission = this.getElementByResource(originPermission.resource, permissionTree)
        if (permission != null) {
          permission.children.push(originPermission)
        } else {
          permissionTree.push({
            id: originPermission.id,
            resource: originPermission.resource,
            permissionName: originPermission.resourceName,
            children: [originPermission]
          })
        }
      })
      return permissionTree
    },
    getElementByResource(resource, list) {
      for (let item of list) {
        if (item.resource === resource) {
          return item
        }
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
  }
</style>
