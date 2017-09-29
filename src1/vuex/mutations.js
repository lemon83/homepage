//test

import {changeControl} from "./actions";

export const changeCount = (state, payload) =>{
	state.count+= 5
	console.log('yellow')
}
export const changeCount1 = (state,payload) =>{
	state.count-=1
	console.log('red')
}

// export const loadMusic = (state,payload) =>{
//
// }
export const getMusic = (state,payload) =>{
	state.music.musicData = payload
}
export const getInfo = (state,payload) =>{
	state.music.name = payload.name
	state.music.author = payload.author
	state.music.url = payload.url
	state.music.length = payload.length
	state.music.index = payload.index
	state.music.isPlay = payload.isPlay
	console.log('获取时间 : ' + new Date().getHours() + '时 ' + new Date().getMinutes() + '分 ' + new Date().getSeconds() + '秒')
	console.log('提交成功')
	console.log(state.music)
}
export const changeIndex = (state,payload) =>{
	state.music.index = payload
}
export const playState = (state,payload) =>{
	state.music.noplay = payload
	console.log(state.music.noplay)
}
