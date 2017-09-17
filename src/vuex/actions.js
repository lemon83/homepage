//test
export const increment11 = context =>{
	context.commit('changeCount1')
}

export const incrementAsync = ({commit}) =>{
	setTimeout(() =>{
		commit('changeCount1')
	},1000)
}
// export const loadMusic = ({commit,state},payload) =>{
// 	commit('loadMusic',payload)
// }

//加载歌曲
export const getMusic = ({commit,state},payload) =>{
	commit('getMusic',payload)
}
export const getInfo = ({commit,state},payload) =>{
	commit('getInfo',payload)
}
//换歌
export const changeIndex = ({commit},payload) =>{
	commit('changeIndex',payload)
}
//播放状态
export const playState = ({commit},payload) =>{
	commit('playState',payload)
}
