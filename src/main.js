import Vue from 'vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

import './assets/style.scss'

Vue.use(VueAxios, axios)

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Необходимо'
});
extend('phone', {
  validate: value => value.length === 10 && /^\d+$/.test(value),
  message: 'Неверный формат'
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
