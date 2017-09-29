import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'

Vue.use(Vuex)
export default new Vuex.Store({
	//state 保存初始数据
	state,
	//mutations 函数
	mutations,
	//触发事件函数
	actions,
	//getter 取值函数
	getters
})
