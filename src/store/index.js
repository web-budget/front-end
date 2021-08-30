import Vue from 'vue'
import Vuex from 'vuex'

import userSessionModule from './user-session.module'
import errorHandlerModule from './error-handler.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userSession: userSessionModule,
    errorHandler: errorHandlerModule
  }
})
