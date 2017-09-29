<template>
	<div class="main pa">
		<router-view class="router-view">
		</router-view>
	</div>
</template>
<script>
	import notes from './notes'
	
	export default {
		name:'main',
		components:{
			notes,
		},
		created(){
		
		}
	}
	
	
</script>

<style scoped>
	.main{
		left: 50%;
		top: 0;
		right : 0;
		bottom: 0;
		overflow: auto;
		overflow-x: hidden;
		overflow-scrolling: touch;
	}
	.router-view{
		min-height:100vh;
	}
</style>