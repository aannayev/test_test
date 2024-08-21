import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import mainView from '../views/main.vue'
import loginView from '../views/login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: mainView,
      async beforeEnter(routeTo, routeFrom, next) {
        if (await store.getters.getUser===null) {
          next("/login")
        }
        next()
      },
    },
    {
      path: '/login',
      name: 'login',
      component: loginView
    }
  ]
})

export default router
