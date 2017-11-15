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
		data(){
			return {
			
			}
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
		-webkit-overflow-scrolling: touch;
		transition:all .3s cubic-bezier(.4,0,0,1);
		z-index:1;
	}
	.router-view{
		min-height:100vh;
	}
	@media (max-width: 768px) {
		.main{
			right: 0;
		}
		.main{
			left: 0;
			top: 50px;
		}
	}
</style>