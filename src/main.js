import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import i18n from './i18n'

import '@/plugins/buefy'
import '@/plugins/vee-validate'
import '@/plugins/vue2-transitions'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
