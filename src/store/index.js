import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import device from '@/store/modules/device'
import systemSetting from '@/store/modules/system-setting'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    device,
    systemSetting
  },
  getters
})

export default store
