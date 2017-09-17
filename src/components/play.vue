<template>
  <div class="player pa">
    <div class="control pa">
      <span class="loop">
        <img :src="a" v-if="loop_s" @click="">
        <img :src="s" v-else @click="">
      </span>
      <span @click="prev">
        <img :src="prev_i" class="prev">
      </span>
      <span>
        <img :src="play_i" class="play" v-if="play" @click="play_">
        <img :src="stop_i" class="stop" v-else @click="stop">
      </span>
      <span @click="next">
        <img :src="next_i" class="next">
      </span>
      <span>
        <img :src="musicList_i" class="list">
      </span>
    </div>
    <audio :src="music_url_default"
           ref="song"
           @ended="next"
            @timeupdate="range"
           id="audio"
    ></audio>
    <div class="panel pa">
      <p class="song_info"
      >{{music_name}} - {{music_author}}</p>
      <div class="progress">
        <div ref="range" class="pr"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import store from '../vuex/store'
export default {
	props:['player'],
	data () {
    return {
      url1:'../../static/music_data.json',
      music_author:'未知',
      music_name:'未知',
      music_url_default:'',
      music_list:[],
      music_len:0,
      value:0,
      timer:null,
      play:true,
      loop_s:true,
    }
  },
	computed:{
		//一些图标
    a(){
        return store.getters.loop_single
    },
    s(){
      return store.getters.loop_all
    },
    prev_i(){
    	return store.getters.prev
    },
    next_i(){
      return store.getters.next
    },
    play_i(){
    	return store.getters.play
    },
    stop_i(){
        return store.getters.stop
    },
    musicList_i(){
    	return store.getters.list
    },
        name(){
			return store.getters.name
		},
		author(){
			return store.getters.author
		},
        index(){
			return store.getters.index
        },
        url(){
        	return store.getters.url
        },
  },
  created(){
      this.all()
  },
    updated(){
	    console.log('play组件中当前歌曲index: ' + this.value,'state中当前歌曲index: ' + this.index)
		    this.getInfo({
			    name:this.music_name,
			    author:this.music_author,
			    url:this.music_url_default,
			    length:this.music_len,
			    index:this.value
		    })
    },
    watch:{
    	name(a,b){
    		this.music_name = a
        },
        author(a,b){
    		this.music_author = a
        },
        index(a,b){
          this.value = a
        }
    },
  methods:{
      ...mapActions([
      	'getMusic'
      ]),
	  ...mapActions([
		  'getInfo'
	  ]),
      //加载歌曲
      all(){
          this.$http.get(this.url1)
              .then((res)=>{
                  this.music_list = res.data.music
                  this.getMusic(res.data.music)
                  this.music_len = this.music_list.length
                  let roll = parseInt(Math.random() * this.music_len)
                  this.value = roll
                  this.music_url_default = this.music_list[roll].url
                  this.music_name = this.music_list[roll].name
                  this.music_author = this.music_list[roll].author
              })
      },
      //歌曲信息
      show_music_info(){
          this.music_name = this.music_list[this.value].name
          this.music_author = this.music_list[this.value].author
//		      this.music_name = this.music_list[this.index].name
//		      this.music_author = this.music_list[this.index].author
//          this.music_url_default = this.music_list[this.value].url
//	      console.log('url:  ' + this.music_list[this.value].url + ';  name:  ' + this.music_name + ';  author:  ' + this.music_author)
      },
      play_(){
//	      this.getMusic(this.music_list)
	      this.play = false
          this.$refs.song.play()
      },
      stop(){
          this.play = true
          this.$refs.song.pause()
          clearInterval(this.timer)
      },
      next(){
	      this.value++
          setTimeout(()=>{
              if(this.play != false) this.play = false
              if(this.value >= this.music_list.length) this.value = 0
              this.$refs.song.src = this.music_list[this.value].url
	          this.show_music_info()
	          this.play_()
          },333)
      },
      prev(){
	      this.value--
	      setTimeout(()=>{
              if(this.play != false) this.play = false
              if(this.value < 0) this.value = this.music_len - 1
              this.$refs.song.src = this.music_list[this.value].url
		      this.show_music_info()
		      this.play_()
          },333)
      },
      //进度条
      range(){
	      let progressBar
	      this.timer = setInterval(()=>{
              this.$refs.range.style.width = progressBar * 100 + '%'
		      progressBar = this.$refs.song.currentTime / this.$refs.song.duration
              if(progressBar >= 1) {
                  clearInterval(this.timer)
                  this.$refs.range.style.width = 0
                  this.play = false
              }
          },33)
      }

  },
}
</script>

<style scoped>
  .player{
    left: 0;
    bottom: 0;
    width: 100%;
  }
  
  .panel{
    bottom: 1.4rem;
    left: 5%;
    right: 5%;
  }
  .panel .progress{
    height: 2px;
    border-radius: 2px;
    background: hsla(0,10%,100%,.6);
  }
  .panel .progress>div{
    width: 0;
    height: 100%;
    border-radius: 2px;
    background: #27c995;
  }
  .panel .progress>div:after{
    content:'';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    right: -.22rem;
    top: -.22rem;
  }
  
  /* 控制器 */
  .control{
    bottom: 40px;
    left: 50%;
    align-items:center;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    transition:all .6s cubic-bezier(.4,0,0,1);
    /*opacity:0;*/
  }
  .control:hover{
      opacity: 1;
  }
  .control span{
    margin:0 5px;
    cursor: pointer;
    font-size: 10px;
  }
  .control span img{
    width: 18px;
    height: 18px;
  }
  .control span .play, .control span .stop{
    width: 40px;
    height: 40px;
  }

  /*歌曲信息*/
  .song_info{
    font-size:10px;
    line-height: 20px;
    color:#fff;
    overflow: hidden;
    white-space:nowrap;
    height: 20px;
  }
</style>
