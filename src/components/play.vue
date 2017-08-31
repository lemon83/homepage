<template>
  <div class="player pa">
    <div class="control pa">
      <span class="loop">
        <img :src="loop_i_a" v-if="loop_s" @click="">
        <img :src="loop_i_s" v-else @click="">
      </span>
      <span @click="prev">
        <img :src="prev_i" class="prev">
      </span>
      <span>
        <img :src="play_i" class="play" v-if="play" @click="play_">
        <img :src="stop_i" class="stop" v-else @click="stop">
      </span>
      <span @click="next">
        <img :src="next_i" class="next">
      </span>
      <span>
        <img :src="musicList_i" class="list">
      </span>
    </div>
    <audio :src="music_url_default" ref="song" @ended="next"></audio>
    <div class="panel pa">
      <p class="song_info">{{music_name}} - {{music_author}}</p>
      <div class="progress">
        <div ref="range" class="pr"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'music',
  data () {
    return {
      url1:'../../static/music_data.json',
      music_author:'未知',
      music_name:'未知',
      music_url_default:'',
      music_list:[],
      music_len:0,
      value:0,
      timer:0,
      play:true,
      loop_s:true,
      loop_i_a:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9\n' +
      'XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB\n' +
      '3aWR0aD0iMTguMjM0Mzc1IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTguMjM0Mzc1IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zP\n' +
      'SJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxk\n' +
      'ZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbCkBmb250LWZhY2UgeyBmb250LWZhbWlseTogaWZvbnQ7IHNyYz\n' +
      'ogdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS5lb3Q/I2llZml4IikgZm9ybWF0KCJlbWJ\n' +
      'lZGRlZC1vcGVudHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LndvZmYiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS50dGYiKSBmb3JtYXQoInRydWV0eXBlIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuc3ZnI2lmb250IikgZm9ybWF0KCJzdmciKTsgfQoKXV0+PC9zdHlsZT48L2RlZnM+PGcgY2xhc3M9InRyYW5zZm9ybS1ncm91cCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgwLjAxNTYyNSwgMC4wMTU2MjUpIj48cGF0aCBkPSJNNzEuODIyMjIyIDY2Mi42NzAyMjJjMjQuNjA0NDQ0LTYuODI2NjY3IDM4Ljk5NzMzMy0zMi4zMTI4ODkgMzIuMTcwNjY3LTU2Ljg4ODg4OS03LjY1MTU1Ni0yNy41OTExMTEtMTEuNTQ4NDQ0LTU2LjIzNDY2Ny0xMS41NDg0NDQtODUuMTkxMTExIDAtMTc1LjA0NzExMSAxNDIuNDIxMzMzLTMxNy40Njg0NDQgMzE3LjQ2ODQ0NC0zMTcuNDY4NDQ0bDQzMC4xNjUzMzMgMEw4NDAuMDc4MjIyIDI4NS4wMTMzMzNjMCAyNi4yODI2NjcgMTguMjg5Nzc4IDM2LjQ2NTc3OCA0MC42MTg2NjcgMjIuNjEzMzMzbDE5Ny4wOTE1NTYtMTIyLjA4MzU1NmMyMi4zMjg4ODktMTMuODUyNDQ0IDIyLjU1NjQ0NC0zNi44MzU1NTYgMC40ODM1NTYtNTEuMDg2MjIyTDg4MC4yMTMzMzMgNi41NDIyMjJjLTIyLjA3Mjg4OS0xNC4yNTA2NjctNDAuMTM1MTExLTQuNDA4ODg5LTQwLjEzNTExMSAyMS44NDUzMzNsMCA4Mi4yODk3NzhMNDA5Ljg4NDQ0NCAxMTAuNjc3MzMzYy0xMDkuNDgyNjY3IDAtMjEyLjQyMzExMSA0Mi42MzgyMjItMjg5Ljg0ODg4OSAxMjAuMDY0QzQyLjYzODIyMiAzMDguMTY3MTExIDAgNDExLjEwNzU1NiAwIDUyMC41OTAyMjJjMCAzNy4zMTkxMTEgNS4wMzQ2NjcgNzQuMjk2ODg5IDE0LjkzMzMzMyAxMDkuOTM3Nzc4IDUuNjg4ODg5IDIwLjQ1MTU1NiAyNC4yNjMxMTEgMzMuODQ4ODg5IDQ0LjUxNTU1NiAzMy44NDg4ODlDNjMuNTE2NDQ0IDY2NC4zNzY4ODkgNjcuNjk3Nzc4IDY2My44MzY0NDQgNzEuODIyMjIyIDY2Mi42NzAyMjJ6TTExMzYuNjQgMzc1LjE4MjIyMkMxMTMwLjk1MTExMSAzNTQuNzMwNjY3IDExMTIuMzc2ODg5IDM0MS4zMzMzMzMgMTA5Mi4xMjQ0NDQgMzQxLjMzMzMzM2MtNC4wOTYgMC04LjI0ODg4OSAwLjU0MDQ0NC0xMi40MDE3NzggMS43MDY2NjctMjQuNjA0NDQ0IDYuODI2NjY3LTM4Ljk5NzMzMyAzMi4zMTI4ODktMzIuMTcwNjY3IDU2Ljg4ODg4OSA3LjY1MTU1NiAyNy41OTExMTEgMTEuNTQ4NDQ0IDU2LjIzNDY2NyAxMS41NDg0NDQgODUuMTkxMTExIDAgMTc1LjA0NzExMS0xNDIuNDIxMzMzIDMxNy40Njg0NDQtMzE3LjQ2ODQ0NCAzMTcuNDY4NDQ0TDMxMS40OTUxMTEgODAyLjU4ODQ0NGwwLTgxLjg5MTU1NmMwLTI2LjI4MjY2Ny0xOC4yODk3NzgtMzYuNDY1Nzc4LTQwLjYxODY2Ny0yMi42MTMzMzNsLTE5Ny4wOTE1NTYgMTIyLjA4MzU1NmMtMjIuMzI4ODg5IDEzLjg1MjQ0NC0yMi41NTY0NDQgMzYuODM1NTU2LTAuNDgzNTU2IDUxLjA4NjIyMmwxOTguMDMwMjIyIDEyNy45MTQ2NjdjMjIuMDcyODg5IDE0LjI1MDY2NyA0MC4xMzUxMTEgNC40MDg4ODkgNDAuMTM1MTExLTIxLjg0NTMzM2wwLTgyLjI4OTc3OCA0MzAuMTY1MzMzIDBjMTA5LjQ4MjY2NyAwIDIxMi40MjMxMTEtNDIuNjM4MjIyIDI4OS44NDg4ODktMTIwLjA2NCA3Ny40MjU3NzgtNzcuNDI1Nzc4IDEyMC4wNjQtMTgwLjM2NjIyMiAxMjAuMDY0LTI4OS44NDg4ODlDMTE1MS41NDQ4ODkgNDQ3LjgyOTMzMyAxMTQ2LjUzODY2NyA0MTAuODIzMTExIDExMzYuNjQgMzc1LjE4MjIyMnoiIGZpbGw9IiNmZmYiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=='
    ,
      loop_i_s:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTguODc1IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTguODc1IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbCkBmb250LWZhY2UgeyBmb250LWZhbWlseTogaWZvbnQ7IHNyYzogdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS5lb3Q/I2llZml4IikgZm9ybWF0KCJlbWJlZGRlZC1vcGVudHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LndvZmYiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS50dGYiKSBmb3JtYXQoInRydWV0eXBlIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuc3ZnI2lmb250IikgZm9ybWF0KCJzdmciKTsgfQoKXV0+PC9zdHlsZT48L2RlZnM+PGcgY2xhc3M9InRyYW5zZm9ybS1ncm91cCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgwLjAxNTYyNSwgMC4wMTU2MjUpIj48cGF0aCBkPSJNNTY3LjEzODQ2MiAxODEuMTY5MjMxbC0xODkuMDQ2MTU0IDBjLTk5Ljc3NDM1OSAwLTE5Ni45MjMwNzcgMzkuMzg0NjE1LTI2Ny44MTUzODUgMTEwLjI3NjkyMy03MC44OTIzMDggNzAuODkyMzA4LTExMC4yNzY5MjMgMTY1LjQxNTM4NS0xMTAuMjc2OTIzIDI2Ny44MTUzODUgMCAzNC4xMzMzMzMgNS4yNTEyODIgNjguMjY2NjY3IDEzLjEyODIwNSAxMDIuNCA1LjI1MTI4MiAxOC4zNzk0ODcgMjMuNjMwNzY5IDMxLjUwNzY5MiA0Mi4wMTAyNTYgMzEuNTA3NjkyIDIuNjI1NjQxIDAgNy44NzY5MjMgMCAxMC41MDI1NjQtMi42MjU2NDEgMjMuNjMwNzY5LTUuMjUxMjgyIDM2Ljc1ODk3NC0yOC44ODIwNTEgMjguODgyMDUxLTUyLjUxMjgyMS03Ljg3NjkyMy0yNi4yNTY0MS0xMC41MDI1NjQtNTIuNTEyODIxLTEwLjUwMjU2NC03OC43NjkyMzEgMC0xNjIuNzg5NzQ0IDEzMS4yODIwNTEtMjk0LjA3MTc5NSAyOTQuMDcxNzk1LTI5NC4wNzE3OTVsMTczLjI5MjMwOCAwQzU1NC4wMTAyNTYgMjM2LjMwNzY5MiA1NTkuMjYxNTM4IDIwNy40MjU2NDEgNTY3LjEzODQ2MiAxODEuMTY5MjMxek05NDcuODU2NDEgNjU2LjQxMDI1NmMtNDcuMjYxNTM4IDk3LjE0ODcxOC0xNDcuMDM1ODk3IDE2NS40MTUzODUtMjYyLjU2NDEwMyAxNjUuNDE1Mzg1TDI4OC44MjA1MTMgODIxLjgyNTY0MWwwLTc2LjE0MzU5YzAtMjMuNjMwNzY5LTE1Ljc1Mzg0Ni0zNC4xMzMzMzMtMzYuNzU4OTc0LTIxLjAwNTEyOGwtMTgxLjE2OTIzMSAxMTIuOTAyNTY0Yy0yMS4wMDUxMjggMTMuMTI4MjA1LTIxLjAwNTEyOCAzNC4xMzMzMzMgMCA0Ny4yNjE1MzhsMTgzLjc5NDg3MiAxMTguMTUzODQ2YzIxLjAwNTEyOCAxMy4xMjgyMDUgMzYuNzU4OTc0IDUuMjUxMjgyIDM2Ljc1ODk3NC0yMS4wMDUxMjhsMC03Ni4xNDM1OSAzOTYuNDcxNzk1IDBjOTkuNzc0MzU5IDAgMTk2LjkyMzA3Ny0zOS4zODQ2MTUgMjY3LjgxNTM4NS0xMTAuMjc2OTIzIDQ0LjYzNTg5Ny00NC42MzU4OTcgNzguNzY5MjMxLTk5Ljc3NDM1OSA5NC41MjMwNzctMTYwLjE2NDEwM0MxMDE2LjEyMzA3NyA2NDUuOTA3NjkyIDk4MS45ODk3NDQgNjUzLjc4NDYxNSA5NDcuODU2NDEgNjU2LjQxMDI1NnpNOTE4Ljk3NDM1OSAwYy0xNjAuMTY0MTAzIDAtMjg4LjgyMDUxMyAxMjguNjU2NDEtMjg4LjgyMDUxMyAyODguODIwNTEzczEyOC42NTY0MSAyODguODIwNTEzIDI4OC44MjA1MTMgMjg4LjgyMDUxMyAyODguODIwNTEzLTEyOC42NTY0MSAyODguODIwNTEzLTI4OC44MjA1MTNTMTA3OS4xMzg0NjIgMCA5MTguOTc0MzU5IDB6TTk3MS40ODcxNzkgNDQzLjczMzMzM2wtNTUuMTM4NDYyIDAgMC0yMTcuOTI4MjA1Yy0yMS4wMDUxMjggMTguMzc5NDg3LTQ0LjYzNTg5NyAzMS41MDc2OTItNzYuMTQzNTkgNDIuMDEwMjU2TDg0MC4yMDUxMjggMjEwLjA1MTI4MmMxNS43NTM4NDYtMi42MjU2NDEgMzEuNTA3NjkyLTEwLjUwMjU2NCA0Ny4yNjE1MzgtMjEuMDA1MTI4IDE1Ljc1Mzg0Ni0xMC41MDI1NjQgMzEuNTA3NjkyLTIxLjAwNTEyOCA0Mi4wMTAyNTYtMzQuMTMzMzMzbDQyLjAxMDI1NiAwTDk3MS40ODcxNzkgNDQzLjczMzMzM3oiIGZpbGw9IiNmZmYiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=='
    ,
      prev_i:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBjbGFzcz0idHJhbnNmb3JtLWdyb3VwIj48ZyB0cmFuc2Zvcm09InNjYWxlKDAuMDE1NjI1LCAwLjAxNTYyNSkiPjxwYXRoIGQ9Ik05NDcuODg1NDYyIDkzLjgxMzY0MmMtNy4zODIxMzEtNC4yMzc1MTEtMTUuNzI3MTkzLTQuMjM3NTExLTIzLjEzNzk3Ni0wLjA0Mjk3OUwyMzEuMTUzNjE0IDQ5MS42MjY5OTdjLTcuMzY2NzgxIDQuMjM3NTExLTExLjYwNjMzOSAxMS40NTc5Ni0xMS42MDYzMzkgMTkuOTc4MDA3IDAgOC40NzgwOTIgNC4yMzk1NTggMTUuNjk3NTE3IDExLjYwNjMzOSAxOS45NjQ3MDRsNjkzLjU5NDg5NSAzOTcuODEzMzU1YzcuNDA5NzYgNC4yMjIxNjEgMTUuNzU1ODQ2IDQuMjIyMTYxIDIzLjEzNzk3NiAwIDcuMzY0NzM1LTQuMjY5MjMzIDExLjU1OTI2Ny0xMS41MTgzMzUgMTEuNTU5MjY3LTE5LjkzNzA3NUw5NTkuNDQ1NzUyIDExMy43NDg2N0M5NTkuNDQ0NzI4IDEwNS4yNTcyNzYgOTU1LjI1MTIyIDk4LjA4MDgyOSA5NDcuODg1NDYyIDkzLjgxMzY0MnpNNjMuOTc4MTI3IDkwLjYzMDEzN2wxMTMuNDkxODIxIDAgMCA4NDEuOTIwMDU4LTExMy40OTE4MjEgMCAwLTg0MS45MjAwNThaIiBmaWxsPSIjZmZmIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4='
    ,
      play_i:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjQuMDBweCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik01MTIgMTAyNEMyMjkuMjMzNzc4IDEwMjQgMCA3OTQuNzY2MjIyIDAgNTEyIDAgMjI5LjIzMzc3OCAyMjkuMjMzNzc4IDAgNTEyIDAgNzk0Ljc2NjIyMiAwIDEwMjQgMjI5LjIzMzc3OCAxMDI0IDUxMiAxMDI0IDc5NC43NjYyMjIgNzk0Ljc2NjIyMiAxMDI0IDUxMiAxMDI0Wk00MDIuMjg5Nzc4IDI3NC4yODk3NzggNDAyLjI4OTc3OCA3NDkuNzEwMjIyIDczMS40MjA0NDQgNTI1Ljk5NDY2NyA0MDIuMjg5Nzc4IDI3NC4yODk3NzhaIiAvPjwvc3ZnPg=='
    ,
      stop_i:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjQuMDBweCIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik01MTIgMEMyMzAuNCAwIDAgMjMwLjQgMCA1MTJzMjMwLjQgNTEyIDUxMiA1MTIgNTEyLTIzMC40IDUxMi01MTJTNzkzLjYgMCA1MTIgMHogbS01Ny42IDcyMy4yYzAgMTkuMi0xOS4yIDMyLTQ0LjggMzItMjUuNiAwLTQ0LjgtMTIuOC00NC44LTMyVjMwMC44YzAtMTkuMiAxOS4yLTMyIDQ0LjgtMzIgMjUuNiAwIDQ0LjggMTIuOCA0NC44IDMydjQyMi40eiBtMjExLjIgMGMwIDE5LjItMTkuMiAzMi00NC44IDMyLTI1LjYgMC00NC44LTEyLjgtNDQuOC0zMlYzMDAuOGMwLTE5LjIgMTkuMi0zMiA0NC44LTMyIDI1LjYgMCA0NC44IDEyLjggNDQuOCAzMnY0MjIuNHoiIC8+PC9zdmc+'
    ,
      next_i:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBjbGFzcz0idHJhbnNmb3JtLWdyb3VwIj48ZyB0cmFuc2Zvcm09InNjYWxlKDAuMDE1NjI1LCAwLjAxNTYyNSkiPjxwYXRoIGQ9Ik03OTIuMTgzMjg0IDQ5MS41NzQ4MDggOTguNjU1OTI3IDkzLjgwMDMzOWMtNy40MDk3Ni00LjIyMjE2MS0xNS43NTM3OTktNC4yMjIxNjEtMjMuMTM0OTA3IDAtNy4zNjQ3MzUgNC4yNjgyMS0xMS41NTgyNDQgMTEuNTE3MzExLTExLjU1ODI0NCAxOS45MzUwMjhsMCA3OTUuNjIxNTkzYzAgOC40OTAzNzIgNC4xOTM1MDkgMTUuNjY1Nzk1IDExLjU1ODI0NCAxOS45MzI5ODEgNy4zODExMDggNC4yMzY0ODggMTUuNzI2MTcgNC4yMzY0ODggMjMuMTM0OTA3IDAuMDQyOTc5bDY5My41MjczNTYtMzk3LjgxODQ3MWM3LjM2Njc4MS00LjIzNjQ4OCAxMS42MDUzMTYtMTEuNDU2OTM2IDExLjYwNTMxNi0xOS45NzU5NkM4MDMuNzg4NTk5IDUwMy4wNjAzOTcgNzk5LjU1MDA2NSA0OTUuODQxOTk1IDc5Mi4xODMyODQgNDkxLjU3NDgwOHpNODQ1Ljg2MTgzNCA5MC42MzMyMDdsMTEzLjQ4MDU2NCAwIDAgODQxLjgzODE5NC0xMTMuNDgwNTY0IDAgMC04NDEuODM4MTk0WiIgZmlsbD0iI2ZmZiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+'
    ,
      musicList_i:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDk1NjE3NTgzMTAxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0NzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODcwLjQgMTUzLjZsMC0xMDIuNC03NjggMCAwIDEwMi40IDc2OCAwek04NzAuNCAzNTguNGwwLTEwMi40LTc2OCAwIDAgMTAyLjQgNzY4IDB6TTUxMiA1NjMuMmwwLTEwMi40LTQwOS42IDAgMCAxMDIuNCA0MDkuNiAwek04OTMuNDQgNDYyLjg0OGwtMzA3LjIgNTcuMzQ0Yy04LjE5MiAxLjAyNC05LjcyOCAxLjUzNi0xNC44NDggNi42NTYtNS42MzIgNC42MDgtOC4xOTIgMTEuMjY0LTguMTkyIDE4Ljk0NGwwIDIzNS4wMDhjLTE0Ljg0OC02LjY1Ni0zMy43OTItNy4xNjgtNDcuNjE2LTcuMTY4LTI3LjY0OCAwLTUxLjIgOS43MjgtNzAuNjU2IDI5LjE4NHMtMjguNjcyIDQzLjAwOC0yOC42NzIgNzAuNjU2YzAgMjcuMTM2IDkuMjE2IDUwLjY4OCAyOC42NzIgNzAuMTQ0czQzLjAwOCAyOS4xODQgNzAuNjU2IDI5LjE4NGMyNS4wODggMCA0Ny4xMDQtOC4xOTIgNjYuMDQ4LTI0LjU3NnMzMC4yMDgtMzYuMzUyIDMzLjI4LTYwLjkyOGwwLTI1My40NCAyNTUuNDg4LTU2LjgzMiAwIDE3OC4xNzZjLTE0Ljg0OC02LjY1Ni0yOC42NzItOS43MjgtNDIuNDk2LTkuNzI4LTI3LjY0OCAwLTU2LjgzMiA5LjcyOC03Ni4yODggMjkuMTg0LTE5LjQ1NiAxOC45NDQtMjkuMTg0IDQyLjQ5Ni0yOS4xODQgNzAuMTQ0czkuNzI4IDUwLjY4OCAyOS4xODQgNzAuMTQ0IDQzLjAwOCAyOS4xODQgNzAuNjU2IDI5LjE4NGMyNy4xMzYgMCA1MC42ODgtOS43MjggNzAuMTQ0LTI5LjE4NHMyOS4xODQtNDIuNDk2IDI5LjE4NC03MC4xNDRsMC0zNTMuMjhjMC04LjE5Mi0yLjU2LTE1LjM2LTguMTkyLTIwLjk5Mi01LjYzMi02LjE0NC0xMi4yODgtOC43MDQtMTkuOTY4LTcuNjh6TTQwOS42IDc2OGwwLTEwMi40LTMwNy4yIDAgMCAxMDIuNCAzMDcuMiAwek0zMDcuMiA5NzIuOGwwLTEwMi40LTIwNC44IDAgMCAxMDIuNCAyMDQuOCAweiIgcC1pZD0iMTQ3MyIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg=='
    }
  },
  created(){
      this.all()
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  methods:{
      //加载歌曲
      all(){
          this.$http.get(this.url1)
              .then((res)=>{
                    this.music_list = res.data.music
                    this.music_len = this.music_list.length
                  let roll = parseInt(Math.random() * this.music_len)
                    this.music_url_default = this.music_list[roll].url
                  this.music_name = this.music_list[roll].name
                  this.music_author = this.music_list[roll].author

              })
      },
      show_music_info(){
          this.music_name = this.music_list[this.value].name
          this.music_author = this.music_list[this.value].author
          console.log(this.music_name + '  --  ' + this.music_author)
      },
      play_(){
          this.play = false
          this.$refs.song.play()
          this.range()
      },
      stop(){
          this.play = true
          this.$refs.song.pause()
          clearInterval(this.timer)
      },
      next(){
          setTimeout(()=>{
              this.range()
              this.value++
              if(this.play != false) this.play = false
              if(this.value >= this.music_list.length) this.value = 0
              this.show_music_info()
              this.$refs.song.src = this.music_list[this.value].url
              this.$refs.song.play()
          },333)
      },
      prev(){
          setTimeout(()=>{
              this.range()
              this.value--
              if(this.play != false) this.play = false
              if(this.value < 0) this.value = this.music_len - 1
              this.show_music_info()
              this.$refs.song.src = this.music_list[this.value].url
              this.$refs.song.play()
          },333)
      },
      //进度条
      range(){
          this.timer = setInterval(()=>{
            let progressBar = this.$refs.song.currentTime / this.$refs.song.duration
              this.$refs.range.style.width = progressBar * 100 + '%'
              if(progressBar === 1) {
                  clearInterval(this.timer)
                  this.$refs.range.style.width = 0
                  this.play = false
              }

          },33)
      }



  },
}
</script>

<style scoped>
  .player{
    left: 0;
    bottom: 0;
    width: 100%;
  }
  
  .panel{
    bottom: 1.4rem;
    left: 5%;
    right: 5%;
  }
  .panel .progress{
    height: 2px;
    border-radius: 2px;
    background: hsla(0,10%,100%,.6);
  }
  .panel .progress>div{
    width: 0;
    height: 100%;
    border-radius: 2px;
    background: #27c995;
  }
  .panel .progress>div:after{
    content:'';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    right: -.22rem;
    top: -.22rem;
  }
  
  /* 控制器 */
  .control{
    bottom: 40px;
    left: 50%;
    align-items:center;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
  }
  .control span{
    margin:0 5px;
    cursor: pointer;
    font-size: 10px;
  }
  .control span img{
    width: 18px;
    height: 18px;
  }
  .control span .play, .control span .stop{
    width: 40px;
    height: 40px;
  }

  /*歌曲信息*/
  .song_info{
    font-size:10px;
    line-height: 20px;
    color:#fff;
    overflow: hidden;
    white-space:nowrap;
    height: 20px;
  }
</style>
