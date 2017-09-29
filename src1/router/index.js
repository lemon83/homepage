import Vue from 'vue'
import Router from 'vue-router'
import Nav from '@/components/Nav'
import Left from '@/components/Left'

import Main from '../view/main'

import Notes from '../view/notes'
import Music from '../view/music'
import About from '../view/about'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
      {path:'/',component:Notes,},
      {path:'/playlist',component:Music,},
      {path:'/about',component:About,}
  ]
})
