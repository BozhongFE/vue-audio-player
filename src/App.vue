<template>
  <div id="app">
    <div class="audio-player-container">
      <audio-player
        ref="player"
        :audio="src"
        :img="background"
        :countdown="countdown"
        :set-duration="duration"
        :showTotal="checkTotal"
        :formatterTime= "checkFormatter"
      ></audio-player>
    </div>
    <div class="tool">
      <label for="formatter"><input id="formatter" v-model="checkFormatter" @change="checkFormatterFn" class="input-check" type="checkbox">只显示分秒</label>
      <label for="total"><input id="total" v-model="checkTotal" @change="checkTotalFn" class="input-check" type="checkbox">是否显示总时长</label>
      <label for="input"><input id="input" v-model="checkbox" @change="checkboxFn" class="input-check" type="checkbox">剩余时长改成倒计时</label>
    </div>
    <ul>
      <li @click="select(item)" v-for="(item, index) of list" v-html="item.name"></li>
    </ul>
  </div>
</template>

<script>
import AudioPlayer from './components/audio-player'
export default {
  name: 'app',
  components: {
    AudioPlayer
  },
  data () {
    return {
      src: '',
      background: '',
      countdown:false,
      duration:0,
      checkbox: false,
      checkTotal: false,
      checkFormatter: false,
      list: [
        {
          name: 'Sleep Alone - 陈奕迅',
          img: 'http://p1.music.126.net/RZYcdHXGZGDhZe2RDpDYbA==/8933531975768019.jpg?param=375y375',
          audio: 'https://source.unclay.com/mp3/sleep_alone.mp3',
          duration:146,
        },
        {
          name: 'PTL - Relient K',
          img: 'http://p1.music.126.net/BrfkYrL_72MYpr47lM-yGg==/4438728441342364.jpg?param=375y375',
          audio: 'http://source.unclay.com/mp3/ptl.mp3',
          duration:0,
        },
        {
          name: 'Cykler - Gustaf Spetz',
          img: 'http://p1.music.126.net/1sfWmWgXgHnPo5Os_-XUaQ==/18714787418297440.jpg?param=375y375',
          audio: 'http://source.unclay.com/mp3/cykler.mp3',
          duration:0,
        },
      ]
    }
  },
  mounted() {
    this.src = this.list[0].audio;
    this.background = this.list[0].img;
    this.duration = this.list[0].duration;
  },
  methods: {
    select(item) {
      this.src = item.audio;
      this.background = item.img;
      this.duration = item.duration;
      this.$nextTick(() => {
        this.$refs.player.play()
      })
    },
    checkboxFn(){
      this.countdown =this.checkbox
      this.$nextTick(() => {
        this.$refs.player.play()
      })
    },
    checkTotalFn() {
      this.showTotal = this.checkTotal
    },
    checkFormatterFn() {
      this.formatterTime = this.checkFormatter
    }
  }
}
</script>

<style>
  #app {
    max-width: 400px;
    margin: 0 auto;
    border: 1px solid #eee;
  }
  ul {
    margin: 20px 0;
    overflow: hidden;
  }
  li {
    padding: 4px 0;
  }
  .tool {
    background:#f2f2f2;
    padding:5px;
    text-align:right;
    font-size:12px;
  }
  .input-check {
    vertical-align: middle;
  }
</style>