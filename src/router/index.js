import Vue from 'vue'
import Router from 'vue-router'
import Nav from '@/components/Nav'
import Left from '@/components/Left'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'nav',
      component: Nav,
      subRoutes:{
        path:'/left',
        component:Left
      }
    }
  ]
})
