<template>
	<div class="note">
		<code>
			ssh
		</code>
		<button @click="show">diN a</button>
		<ol>
			<li
				v-for="item in hehe"
				:key="item.id"
			>{{item.id}} : {{item.text}}</li>
		</ol>
	</div>
</template>

<script>
	import App from '../App'
	export default {
		name:'notes',
		data(){
			return {
				arr:[]
			}
		},
		props:['hehe'],
		created(){
		
		},
		methods:{
			show(){
				console.log(this.hehe)
			}
		}
	}
</script>

<style scoped>

</style>