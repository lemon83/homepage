import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'


import Reset from './../static/reset.css'

import Main from './view/main'
import Notes from './view/notes'
import Music from './view/music'
import Abuout from './view/about'

Vue.config.productionTip = false

Vue.prototype.$http = axios




/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})