export default {
  namespaced: true,
  state: {
    error: null
  },
  actions: {
    catchError({ commit }, error) {
      commit('handle', error)
    }
  },
  mutations: {
    handle(state, error) {
      state.error = error
    }
  },
  getters: {
    status: state => {
      return state.error.status
    },
    statusText: state => {
      return state.error.statusText
    },
    data: state => {
      return state.error.data
    },
    error: state => {
      return state.error
    }
  }
}
