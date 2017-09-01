import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Reset from './../static/reset.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
