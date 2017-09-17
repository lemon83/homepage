<template>
	<div>
		关于我
		<hr>
		<button @click="jia">测试按钮+</button>
		<button @click="jian">测试按钮-</button>
		<p>{{increment}}</p>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name:'about',
		data(){
			return {
				five:5
			}
		},
		computed:{
			increment(){
				return this.$store.getters.increment
			}
		},
		methods:{
			...mapMutations([
				'changeCount'
			]),
			...mapMutations({
				add:'changeCount'
			}),
			jia(){
				this.add()
			},
			jian(){
				this.$store.dispatch('incrementAsync')
			}
		}
	}
</script>