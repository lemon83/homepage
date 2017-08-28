<template>
  <div class="mask pa">
    <div class="logo text">
      <a class="index" href="/" @click="con">
        <img :src="musicList.icon_logo" alt="" @click.stop.prevent="con">
      </a>
      <div class="nav tc">
        <a :href="nav.index" @click.prevent.stop="">笔记</a> /
        <a :href="nav.playlist" @click.prevent.stop="">音乐</a> /
        <a :href="nav.about" @click.prevent.stop="">关于</a>
      </div>
    </div>
    <div class="music-content">
      <music>
      
      </music>
    </div>
  </div>
</template>

<script>
import music from './play'
export default {
  name: 'nav',
  components:{
    music,
  },
  data () {
    return {
      musicList:{
        icon_logo:'data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIgogICAgYmFzZVByb2ZpbGU9ImZ1bGwiCiAgICB3aWR0aD0iMTM0\n' +
        'IiBoZWlnaHQ9IjMwIgogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCgo8\n' +
        'dGV4dCB4PSIiIHk9IjI4IiBmb250LXNpemU9IjI4IiBkb21pbmFudC1iYXNlbGluZT0idG9wIiBm\n' +
        'aWxsPSJ3aGl0ZSI+TEVNT044MzwvdGV4dD4KPC9zdmc+Cg==',
        icon_loop:''
      },
      
      nav:{
        index:'/',
        playlist:'/playlist/',
        about:'/about/'
      }
  
  }
  },
  methods:{
    con(e){
      console.log(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mask{
    display: flex;
    justify-content: center;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(168,216,185,.4);
  }
  .logo{
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%,-50%)
  }
  .text{
    color: white;
    font-family: Verdana;
  }
  .index{
    display: inline-block;
  }
  .nav{
    color:#fff;
    font-size:1rem;
    font-family:"Microsoft YaHei";
    font-weight: 100;
  }
  .nav a {
    color:#fff;
  }
  播放器
  .music-content{
    align-self: flex-end;
    width: 100px;
    background-color: red;
  }
</style>
