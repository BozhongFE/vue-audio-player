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
npm run build
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
|timeFormatter|Function|xx:xx|time format|

## Events

|Event|Desc|
|-----|----|
|play|this.$refs.player.play()|
|pause|this.$refs.player.pause()|

## License

MIT