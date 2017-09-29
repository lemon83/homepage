<template>
  <div class="mask pa">
    <div class="logo text">
      <router-link to="/" class="index" href="/">
        <img :src="logo" alt="">
      </router-link>
      <div class="nav tc">
        <router-link to="/">笔记</router-link> /
        <router-link to="/playlist">音乐</router-link> /
        <router-link to="/about">关于</router-link>
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
import store from '../vuex/store'
export default {
  name: 'nav',
  components:{
    music,
  },
    data(){
      return {
          receive:''
      }
    },
    mounted(){
    	this.$on('author',(data) =>{
    		this.receive = data
        })
    },
    computed:{
  	  logo(){
  	  	return store.getters.getLogo
      }
    }
}
</script>

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
    background-color: rgba(168,216,185,.3);
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
  .nav{
    color:#fff;
    font-size:1rem;
    font-family:"Microsoft YaHei";
    font-weight: 100;
  }
  .nav a {
    color:#fff;
  }
  /*播放器*/
  .music-content{
    align-self: flex-end;
    width: 100px;
    background-color: red;
  }
</style>
