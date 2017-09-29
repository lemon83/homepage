<template>
  <div id="app">
    <left>
    
    </left>
    <right>
    
    </right>
  </div>
</template>

<script>
  import left from './components/Left'
  import right from './view/main'
  
  export default {
    components:{
      left,
        right,
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
