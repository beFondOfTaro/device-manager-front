import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import device from '@/store/modules/device'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    device
  },
  getters
})

export default store
