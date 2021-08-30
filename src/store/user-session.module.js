import jwtDecode from 'jwt-decode'

const tokenKey = '__wb-session-token'

const token = JSON.parse(localStorage.getItem(tokenKey))

const initialState = token
  ? { status: { loggedIn: true }, token }
  : { status: { loggedIn: false }, token: null }

export default {
  namespaced: true,
  state: initialState,
  actions: {
    createSession({ commit }, token) {
      commit('create', token)
    },
    destroySession({ commit }) {
      commit('destroy')
    }
  },
  mutations: {
    create(state, token) {
      localStorage.setItem(tokenKey, JSON.stringify(token))
      state.status.loggedIn = true
      state.token = token
    },
    destroy(state) {
      localStorage.removeItem(tokenKey)
      state.status.loggedIn = false
      state.token = null
    }
  },
  getters: {
    accessToken: state => {
      return state.token.accessToken
    },
    isLoggedIn: state => {
      return state.status.loggedIn
    },
    subject: state => {
      const token = state.token
      if (token) {
        const decoded = jwtDecode(state.token.accessToken)
        return decoded.sub
      }
    }
  }
}
