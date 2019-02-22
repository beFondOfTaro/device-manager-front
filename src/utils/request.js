import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非0是抛错
     */
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 3) {
        onReLogin()
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
      showClose: true
    })
    // token过期，重新登录
    if (error.response.status === 401) {
      onReLogin()
    }
    return Promise.reject(error)
  }
)

/**
 * 重新登录
 */
function onReLogin() {
  MessageBox.confirm(
    '你已被登出，可以取消继续留在该页面，或者重新登录',
    '确定登出',
    {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    store.dispatch('FedLogOut').then(() => {
      location.reload() // 为了重新实例化vue-router对象 避免bug
    })
  })
}
export default service

/**
 * 分页对象构造函数
 * @constructor
 */
export class QueryPage {
  constructor() {
    this.pageSize = 10
    this.pageNum = 1
  }
}
