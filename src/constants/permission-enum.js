/**
 * 权限枚举
 */
const PERMISSION_ENUM = {
  // 系统设置
  SYS_SETTING: {
    // 用户管理
    USER: {
      USER_ADD: 'user:add',
      USER_DELETE: 'user:delete',
      USER_UPDATE: 'user:update'
    },
    // 菜单管理
    MENU_MANAGEMENT: {
      LOCATION: {
        LOCATION_ADD: 'location:add',
        LOCATION_UPDATE: 'location:update',
        LOCATION_DELETE: 'location:delete'
      },
      CATEGORY: {
        CATEGORY_ADD: 'category:add',
        CATEGORY_UPDATE: 'category:update',
        CATEGORY_DELETE: 'category:delete'
      },
      WORK_NATURE: {
        WORK_NATURE_ADD: 'nature:add',
        WORK_NATURE_DELETE: 'nature:delete'
      },
      BRAND: {
        BRAND_ADD: 'brand:add',
        BRAND_DELETE: 'brand:delete'
      },
      DEVICE_MODEL: {
        DEVICE_MODEL_ADD: 'model:add'
      }
    }
  },
  // 设备管理
  DEVICE: {
    DEVICE_ADD: 'device:add',
    DEVICE_UPDATE: 'device:update',
    DEVICE_DELETE: 'device:delete',
    DEVICE_GET: 'device:get',
    DEVICE_DISTRIBUTE: 'device:distribute',
    DEVICE_DISCARD: 'device:discard'
  }
}

export default PERMISSION_ENUM
