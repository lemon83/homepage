<template>
	<div class="playlist" id="playlist" ref="test">
		<a href="javascript:void(0)"
		   @click="changeMusic(i)"
		   v-for="(data,i) in this.$store.state.music.musicData"
		   :class="{'active':index===i}"
		>{{data.name}} - {{data.author}}</a>
	</div>
</template>

<script>
	import {mapActions,mapMutations} from 'vuex'
	import store from '../vuex/store'
	//音乐列表
	export default {
		name:'music',
		data(){
			return {
				play:false
			}
		},
		computed:{
			name(){
				return store.getters.name
			},
			author(){
				return store.getters.author
			},
			index(){
				return store.getters.index
			},
			length(){
				return store.getters.len
			},
			url(){
				return store.getters.url
			},
			list(){
				return store.getters.list_m
			},
		},
		created(){
			//初始化
			
		},
		methods:{
			...mapMutations([
				'changeIndex',
				{
					payload(i){
						return i
					}
				}
			]),
			...mapActions([
				'getInfo'
			]),
			changeMusic(i){
				this.play = true
				this.changeIndex(i)
				let audio = document.querySelector('#audio')
				audio.src = this.list[i].url
				audio.play()
				console.log('当前index: ' + this.index,'点击index： ' + i,'state中index: ' + store.getters.index)
				this.getInfo({
					name:this.list[i].name,
					author:this.list[i].author,
					length:this.length,
					url:this.list[i].url,
					index:i,
					isPlay:this.play
				})
			}
		}
	}
	
</script>


<style scoped>
	input{
		background-color: green;
	}
	.playlist{
		padding: 1.2rem;
		font-size: 1rem;
		background-color: rgba(168,216,185,.1);
	}
	a{
		float: left;
		text-align: left;
		text-overflow: ellipsis;
		text-indent:.5rem;
		margin-right: 1.2rem;
		white-space: nowrap;
		height: 3rem;
		line-height:3rem;
		width: 45%;
	}
	.active{
		color: rgba(233,171,65,.5);
	}
</style>