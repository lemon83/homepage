//取得数据
	//头像
	export const getLogo = state => state.logo

//播放器控制图标
	//单曲循环
	export const loop_single = state => state.a
	//列表循环
	export const loop_all = state => state.s
	//上一首
	export const prev = state => state.prev
	//下一首
	export const next = state => state.next
	//播放
	export const play = state => state.play
	//暂停
	export const stop = state => state.stop
	//列表
	export const list = state => state.musicList

	//获取音乐列表内容
	export const list_m = state => state.music.musicData
	//获取列表长度
	export const len = state => state.music.length
	//初始路径
	export const url = state => state.music.url
	//初始信息-歌名
	export const name = state => state.music.name
	//初始信息-作者
	export const author = state => state.music.author
	//当前播放
	export const index = state => state.music.index
	//是否处于播放状态
	export const isPlay = state => state.music.isPlay

	//移动端
	export const isactive = state => state.isactive

//test
	export const increment = state => state.count

//2017,11,13
	export const gadget = state => state.gadget