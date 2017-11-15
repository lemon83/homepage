<template>
	<div class="cont">
		<!--<p>ID为:{{$route.params.id}}</p>-->
		<p class="menu">
			<router-link to="/about/identify">验证码</router-link>
			<router-link to="/about/movie">电影儿</router-link>
		</p>
		<router-view>
		
		</router-view>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import store from '../vuex/store'
	import identify from '../gadget/identify'
	
	export default {
		name:'about',
		components:{
			identify,
		},
		data(){
			return {
			
			}
		},
		computed:{
			gadget(){
			
			}
		},
		methods:{
			show_identify(){
			
			}
		
		}
	}
</script>


<style scoped>
	.cont{
		width:100%;
		height:100%;
	}
	.menu{
		margin-bottom:1.875rem;
		color:white;
	}
</style>