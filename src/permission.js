import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import { getLocalStorage } from '@/utils/storage'
import { LOCALSTORAGE_KEY } from '@/constants/business-key'

// 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.userInfo === null) {
        store.dispatch('FedLogOut').then(() => {
          Message.error('Verification failed, please login again')
          next({ path: '/' })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

/**
 * 校验权限，拥有权限返回true
 * @param target 要校验是否存在的权限，若为一个对象，其中一个属性匹配成功即返回ture
 */
export function checkPermission(target) {
  let permissionList = getLocalStorage(LOCALSTORAGE_KEY.USER_INFO).permissionList
  return checkPermissionInList(target, permissionList)
}

/**
 * 校验权限，拥有权限返回true
 * @param target 要校验是否存在的权限，若为一个对象，其中一个属性匹配成功即返回ture
 * @param permissionList 权限列表
 */
function checkPermissionInList(target, permissionList) {
  for (let permission of permissionList) {
    if (typeof (target) === 'string') {
      if (permission.permissionCode === target) {
        return true
      }
    } else {
      for (let item in target) {
        if (checkPermissionInList(target[item], permissionList)) {
          return true
        }
      }
    }
  }
  return false
}
