<template>
  <div :class="[class_,{'active':isactive}]">
    <video :src="video_url" autoplay loop playsinline="true"></video>
    <v-nav>
    
    </v-nav>
  </div>
</template>

<script>
  import vNav from './Nav'
  import store from '../vuex/store'
export default {
  name: 'Left',
  components:{
    vNav
  },
  data () {
    return {
      video_url:'../../static/bingbg.mp4',
        t:false,
        class_:[
            'side',
            'pa',
        ]
    }
  },
    computed:{
      isactive(){
          return store.getters.isactive
      }
    },
    created(){
    },
}
</script>

<style scoped>
  .side{
    left: 0;
    top: 0;
    bottom: 0;
    width: 50%;
    overflow: hidden;
  }
  video{
    position: absolute;
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  @media(max-width: 768px){
    .side{
      left: 0;
      width: 100%;
      height: 100%;
      opacity:0;
      transform:translateY(100%);
      transition:all 1s cubic-bezier(.075,.82,.165,1);
    }
    .active{
      opacity:1;
      transform:translateY(0);
      z-index:35;
    }
  }
</style>
