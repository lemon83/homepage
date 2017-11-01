<template>
  <div id="app">
    <left >
    
    </left>
    <right>
    
    </right>
    <index>

    </index>
  </div>
</template>

<script>
  import left from './components/Left'
  import right from './view/main'
  import index from './view/index'

  export default {
    components:{
        left,
        right,
        index
    },
      data(){
    	return {
    		
        }
      }
  }
</script>

<style>
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
