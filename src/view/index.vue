<template>
    <div class="topbar">
        <span class="left" @click="show_control">左</span>
        <span class="center">
            <img :src="logo" alt="">
        </span>
        <span class="right" @click="to_about">右</span>
    </div>
</template>
<script>
    import store from '../vuex/store'
    import {mapMutations} from 'vuex'
	export default {
		name:'index',
		computed:{
            logo(){
                return store.getters.getLogo
            },
            isactive(){
                return store.getters.isactive
            }
        },
        watch:{
		    isactive(a,b){
		        console.log('监控状态:',a)
            }
        },
        methods:{
            ...mapMutations([
                'changeactive',
                {
                    payload(is){
                        return is
                    }
                }
            ]),
            show_control(){
                this.changeactive(!this.isactive)
            },
            to_about(){

            }
        }
	}
	
	
</script>

<style scoped>
    .topbar{
        opacity:0;
        height: 50px;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        background-color: #27c995;
        color:#fff;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .topbar span{
        font-size:1rem;
        text-align: center;
    }
    .topbar .center{
        width: 100%;
    }
    @media (max-width: 768px){
        .topbar{
            opacity:1;
        }
    }


    /*.active{*/
        /*opacity:1;*/
        /*transform:translateY(0);*/
    /*}*/
</style>