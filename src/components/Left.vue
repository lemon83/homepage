<template>
  <div class="side pa">
    <video :src="video_url" autoplay loop></video>
    <v-nav>
    
    </v-nav>
  </div>
</template>

<script>
  import vNav from './Nav'


export default {
  name: 'Left',
  components:{
    vNav
  },
  data () {
    return {
      video_url:'../../static/bingbg.mp4'
    }
  },
  methods:{
  
  }
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
</style>
