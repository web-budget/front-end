import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

import homeRoutes from './home.route.js'
import dashboardRoutes from './dashboard.route.js'
import financialRoutes from './financial.route.js'
import registrationRoutes from './registration.route.js'
import administrationRoutes from './administration.route.js'
import authenticationRoutes from './authentication.route.js'

Vue.use(VueRouter)

const routes = [
  ...homeRoutes,
  ...financialRoutes,
  ...dashboardRoutes,
  ...registrationRoutes,
  ...authenticationRoutes,
  ...administrationRoutes
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters['userSession/isLoggedIn']
  if (to.matched.some(route => route.meta.public) || loggedIn) {
    next()
  } else {
    next({ name: 'login', params: { redirect: to.path } })
  }
})

export default router
