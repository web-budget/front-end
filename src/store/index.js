import Vue from 'vue'
import Vuex from 'vuex'

import userSessionModule from './user-session.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userSession: userSessionModule
  }
})
