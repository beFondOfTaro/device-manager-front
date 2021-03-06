import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/list-device',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'all-device',
        component: () => import('@/views/device-list/index'),
        meta: { title: '所有设备', icon: 'form' }
      }
    ]
  },

  {
    path: '/in-store-device',
    component: Layout,
    children: [
      {
        path: '',
        name: 'in-store-device',
        component: () => import('@/views/device-list/InStoreDevice'),
        meta: { title: '库存设备', icon: 'form' }
      }
    ]
  },

  {
    path: '/using-device',
    component: Layout,
    children: [
      {
        path: '',
        name: 'using-device',
        component: () => import('@/views/device-list/UsingDevice'),
        meta: { title: '使用中设备', icon: 'form' }
      }
    ]
  },

  {
    path: '/discarded-device',
    component: Layout,
    children: [
      {
        path: '',
        name: 'discarded-device',
        component: () => import('@/views/device-list/DiscardedDevice'),
        meta: { title: '废弃设备', icon: 'form' }
      }
    ]
  },

  {
    path: '/system-setting',
    component: Layout,
    meta: { title: '系统设置', icon: 'form' },
    children: [
      {
        path: 'user',
        name: 'user-management',
        component: () => import('@/views/system-setting/user-management/index.vue'),
        meta: { title: '用户管理', icon: 'form' }
      },
      {
        path: 'role',
        name: 'role-management',
        component: () => import('@/views/system-setting/role-management/index.vue'),
        meta: { title: '角色管理', icon: 'form' }
      },
      {
        path: 'category',
        name: 'category-management',
        component: () => import('@/views/system-setting/category-management/index.vue'),
        meta: { title: '分类管理', icon: 'form' }
      }
    ]
  },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
