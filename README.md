# vue-audio-player

> Vue Component: Audio Player

## Demo

<p align="center">
  <a href="https://source.unclay.com/vue-audio-player/index.html">
    <img src="https://source.unclay.com/vue-audio-player/qrcode.png" width="100" alt="">
  </a>
  <br>
  <a style="display: block;" href="https://source.unclay.com/vue-audio-player/index.html">Online Demo >> </a>
</p>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build:demo

# build dist/*.js
npm run build

# build to bz
npm run build:moe
```

## Install

```bash
npm install vue-audio-player --save
```

## Server

```html
<template>
  <div id="app">
    <audio-player
      :audio="src"
      :img="background"
    ></audio-player>
  </div>
</template>

<script>
import AudioPlayer from 'vue-audio-player'
export default {
  components: {
    AudioPlayer
  },
  data () {
    return {
      src: '',
      background: ''
    }
  }
}
</script>
```

## Browser

```html
<div id="app">
  <audio-player
    ref="player"
    :audio="src"
    :img="background"
  ></audio-player>
</div>
<script src="./dist/audio-player.js"></script>
<script>
  new Vue({
    el: '#app',
    components: {
      AudioPlayer
    },
    data: {
      src: '',
      background: ''
    },
    mounted: function () {
      // this.$refs.player.play();
      // this.$refs.player.pause();
    }
  })
</script>
```

## Options

|Key|Type|Default|Desc|
|---|----|-------|----|
|audio|String||audio's src|
|img|String||background's src|
|width|Number|null|player's width|
|height|Number|null|player's width|
|countdown|Boolean|false|player's countdown|
|showTotal|Boolean|false|show audio total time|
|formatterTime|Boolean|false|show audio time formatter's minute and second|
|setDuration|Number|0|The total length of incoming external audio|
|timeFormatter|Function|xx:xx|time format|

## Events

|Event|Desc|
|-----|----|
|play|this.$refs.player.play()|
|pause|this.$refs.player.pause()|

## 开发版本日志

|#|版本号|日期|版本内容|
|---|---|---|---|
|#|0.1.0|20171221| v0.1.0发布
|#|1.0.0|20171226| 更换打包配置，增加事件回调，部分细节更改
|#|0.1.0|20180108| 添加时长字段，可外部传入(解决安卓4.4.2手机，前端获取不到音频时长问题)
|#|1.1.0|20180927| 合并0.1.0分支，添加显示总时长及时长格式

## License

MIT