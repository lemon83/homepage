import Vue from 'vue'
import Router from 'vue-router'
import Nav from '@/components/Nav'
import Left from '@/components/Left'

import Main from '../view/main'

import Notes from '../view/notes'
import Music from '../view/music'
import About from '../view/about'


import Identify from '../gadget/identify'
import Movie from '../gadget/movie'
import Empty from '../gadget/empty'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
      {path:'/',component:Notes,},
      {path:'/playlist',component:Music,},
      
      {
          path:'/:id',component:About,
              children:[
                        {path:'',component:null},
                        {path:'identify',component:Identify},
                        {path:'movie',component:Movie}
              ],
      }
  ]
})
