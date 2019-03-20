import { login } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { LOCALSTORAGE_KEY } from '@/constants/business-key'

const user = {
  state: {
    token: getToken(),
    roles: [],
    userInfo: getLocalStorage(LOCALSTORAGE_KEY.USER_INFO)
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.identifyType, userInfo.imageValidationCode, userInfo.validationToken)
          .then(response => {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            setLocalStorage(LOCALSTORAGE_KEY.USER_INFO, data.userInfo)
            commit('SET_USER_INFO', data.userInfo)
            resolve()
          }).catch(error => {
            console.error(error)
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_USER_INFO', null)
        removeToken()
        localStorage.removeItem(LOCALSTORAGE_KEY.USER_INFO)
        resolve()
      })
    }
  }
}

export default user
