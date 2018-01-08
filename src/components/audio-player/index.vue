<template>
  <div class="audio-player" :style="{ width: width + 'px', height: (height || boxWidth) + 'px' }">
    <audio class="audio-player--audio" controls title="sleep_alone" meta="sleep_alone" :src="audio"></audio>
    <div class="audio-bg">
      <img class="audio-bg--img" :src="img" alt="" />
    </div>
    <div class="audio-bar">
      <div @touchmove.prevent="_barTouchmove($event)" @touchend.prevent="_barTouchend($event)" class="audio-bar__progress">
        <div v-show="!loaded" class="small-loading audio-bar__loading"></div>
        <div class="audio-bar__progress-box">
          <div class="audio-bar__progress--bg"></div>
          <div class="audio-bar__progress--now" :class="{'loaded': loaded}" :style="{ width: currentTime/duration*100 + '%' }"></div>
        </div>
      </div>
      <div class="audio-bar__time" v-html="timeFormatter(countdown ? duration - currentTime : currentTime)"></div>
      <div @click="_audioPlay" :class="['audio-bar__btn', { 'play': !playing, 'pause': playing }]">
      </div>
    </div>
    <div class="audio-bar">

    </div>
  </div>
</template>

<script>
// rem
(function(scope){
  // 下面750对应设计稿的宽度
  // document.body.innerHTML = window.innerWidth;
  var ua = navigator.userAgent.toLocaleLowerCase();
  var eventName = 'onorientationchange' in scope ? 'orientationchange' : 'resize';
  var howLong = /chrome|firefox|ucbrowser|mqqbrowser/.test(ua) || (/safari/.test(ua) && /iphone/.test(ua)) ? 0 : 300;
  var winWidth = document.documentElement.clientWidth;
  var docWidth = window.innerWidth;
  var _width = winWidth < docWidth ? winWidth : docWidth; // 兼容部分奇怪的安卓机
  document.documentElement.style.fontSize = (_width / 750 * 40) + 'px';
  scope.addEventListener(eventName, function(){
    clearTimeout(scope.orientationChangedTimeout);
    scope.orientationChangedTimeout = setTimeout(function(){
      document.documentElement.style.fontSize = (_width / 750 * 40) + 'px';
    }, howLong);
  }, false);
}(window));

export default {
  name: 'audio-player',
  data () {
    return {
      duration: 0,
      currentTime: 0,
      boxWidth: 0,
      progressWidth: 0,
      touching: false,
      playing: false,
      loaded: true,
    }
  },
  props: {
    audio: {
      type: String
    },
    img: {
      type: String
    },
    width: Number,
    height: Number,
    countdown: Boolean,
    setDuration:{
      type:Number,
      default:0
    },
    timeFormatter: {
      type: Function,
      default (time) {
        const timeFormat = (num) => {
          if (num < 10) return `0${num}`
          return num
        }
        const hour = timeFormat(Math.floor(time / 3600));
        const minute = timeFormat(Math.floor(time /60 % 60));
        const second = timeFormat(Math.floor(time % 3600 % 60));
        return `${hour}:${minute}:${second}`
      }
    },
  },
  watch: {
    audio(val) {
      const self = this;
      this.currentTime = this.$elAudio.currentTime = 0;
    }
  },
  mounted () {
    const self = this;
    self.$nextTick(() => {
      // 初始化背景图宽高
      self.boxWidth = self.$el.clientWidth
      self.$elProgress = self.$el.querySelector('.audio-bar__progress')
      self.progressWidth = self.$elProgress.clientWidth
      // 初始化音频总时长
      self.$elAudio = self.$el.querySelector('.audio-player--audio')
      self.$elAudio.addEventListener('durationchange', () => {
        self.duration = self.setDuration || self.$elAudio.duration
        self.audioInterval = setInterval(() => {
          if (!self.touching) {
            self.currentTime = Math.ceil(self.$elAudio.currentTime);
            if (self.currentTime > 0) self.loaded = true;
          }
        }, 1000)
      }, false)
      self.$elAudio.addEventListener('canplaythrough', () => {
        self.loaded = true
      }, false) 
      self.$elAudio.addEventListener('pause', () => {
        self.playing = false
      }, false)
    })
  },
  methods: {
    _barTouchmove(e) {
      this.touching = true;
      const target = e.changedTouches[0]
      const diff = target.clientX - this.$elProgress.offsetLeft;
      let currentTime = Math.floor(diff / this.progressWidth * this.duration);
      if (currentTime > this.duration) {
        currentTime = this.duration
      }
      this.currentTime = currentTime
    },
    _barTouchend(e) {
      this.touching = false;
      const target = e.changedTouches[0]
      const diff = target.clientX - this.$elProgress.offsetLeft;
      let currentTime = Math.ceil(diff / this.progressWidth * this.duration);
      if (currentTime > this.duration) {
        currentTime = this.duration
      }
      this.currentTime = this.$elAudio.currentTime = currentTime
      this.play()
    },
    _audioPlay() {
      if (this.$elAudio.paused) {
        this.play()
        return
      }
      this.pause()
    },
    play() {
      if (this.$elAudio.paused) {
        this.$elAudio.play();
        this.playing = !this.$elAudio.paused;
        if (this.currentTime === 0) this.loaded = false;
      }
    },
    pause() {
      if (!this.$elAudio.paused) {
        this.$elAudio.pause()
        this.playing = !this.$elAudio.paused;
      }
    }
  },
  destroy () {
    clearInterval(this.audioInterval)
  }
}
</script>

<style scoped>
/* 所有rem x 40 = 设计稿尺寸*/
.audio-player {
  position: relative;
  background-color: #fff;
}
.audio-player--audio {
  display: none;
  visibility: hidden;
  opacity: 0;
}
.audio-bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.audio-bg--img {
  width: 100%;
}
.audio-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}
.audio-bar__time {
  margin-left: 1.05rem;
  color: #eee;
  /*line-height: 36px;*/
  font-size: 0.6rem;
}
.audio-bar__progress {
  position: relative;
  flex: 1;
  margin: 0.925rem 0;
  height: 0.45rem;
}
.audio-bar__loading {
  position: absolute;
  z-index: 1;
  left: -0.375rem;
  top: 0;
}
.audio-bar__progress-box {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.audio-bar__progress--bg {
  height: 0.125rem;
  background-color: #777;
  border-radius: 0.0625rem;
}
.audio-bar__progress--now {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0.125rem;
  background-color: #fff;
  border-radius: 0.0625rem;
}
.audio-bar__progress--now.loaded:after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background-color: #fff;
}
.audio-bar__btn {
  position: absolute;
  left: 1rem;
  bottom: 2.3rem;
  width: 2rem;
  height: 2rem;
  color: #fff;
  -webkit-tap-highlight-color: transparent;
}
.audio-bar__btn.play {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAolBMVEUAAAAAAAD9/f0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f0AAAD6+vpTU1Pw8PDr6+u3t7ewsLCBgYFjY2Pp6enY2NjV1dXIyMj+/v77+/v4+Pj29vb09PTt7e3l5eXi4uLR0dHNzc3CwsK/v7+np6dwcHA2Njb7+/vy8vLt7e3t7e3d3d27u7srKyv///8R4QqsAAAANXRSTlMzAPUwLQcEHisSDiclGBYPIfcd7EXPwXhyVkq9npmJ+vDm3drIs66UjoGAa0498dLJxad8O7UE/foAAAJKSURBVFjDzdnpUtswFIbhr5Ys70tishCSsralQPfq/m+tbKmGytbRkRqG5z/vTAZZlo7xzk2VbVbnQgBC5nXWlor4A2ewm+ew5PMuLFj2AhNEX7KDrYSTbFnBRoAkGu9gIeFFFl7BtIa3OqWDhQCDKKhgBqbeGVQV2Co1HUwlAsjUDppedBFEj100QSURTKqRYIUIlR3MECX7N1jAtr5MLj/BU/EymApYjvWDxTG8iPRFsIZtqZ9cw0ttguM/GIN+9v3O80eboMSIRO+d3sCDNMEG40FjewRa8zcoyKBO3oMk9sEW00FjuQGlfQ5Kr6BOViDIp2AJd9DYgVA+BnsqaHwjVnn/GBR00Lj+DQfxEOzACephDYfuPpgRQYtrv8jug5Ib1Is7x/8ZCuygPp1e5QolI2gspx7FDk1QUJ/dYlSDjBc0fmwwIkMVGtSzG9gq5OygsYUlh4gIanu7EHHBi5EgYoIJCNzgDDYRExxGcjImuLODUcvmCpYcVXjwI2xV+KN3sRp/9JrA4MQO1gRuX8Pt5PalQoIfvmCCCnkFJL8wRRIvKWK3tmX81+hsC4eO/aI/OYKD4B5FZp/h1DMPS1cbuJWs45z+CYJkHTiHNSgtcSS21jJBMA7tXtefhrhWzKyNyk1SF5+zfe7rCj4K6mq2MGvZR01eHtdmLXsQKX293Z0n5ycb+CkOewGPHxEceIgRP2Y58CDIFHMEyNNXGKYZczDNqYFkxxtIdgcdmcYPdV997GwoejCu/u/o/i18XLA+fwivzx9/AIAT35xYsL7EAAAAAElFTkSuQmCC') no-repeat;
  background-size: 100% 100%;
}
.audio-bar__btn.pause {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAASFBMVEUAAAAAAACbm5sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc3NwAAAD7+/v9/f3q6up5eXlYWFgbGxv8/Pzy8vLy8vL///+mywzUAAAAF3RSTlMzAGMuBioXDiAlEh2lEPH5v1JGOPHU02yQnmwAAAGXSURBVFjDzdnJEoMgEATQNsMqmn35/z9NYg6UCyKhD/aRwyuoUhgGNOtR1gSvBYBo7YOxqlnPKmiDxiw62P9A65CMs8WgEaxGTArMcXkyD7aCTZF2E6g8NserPNgKCiJtDnQojFsFlUZxtJqBVV4U56AS/BVRMzB61SLq1htXPQc1KqLnoENV3BRsUZl2DCqpBUWNQI/q+AjGBVcuOoLCACWCBku5dcfT+YpJrufTvbthKWYA0xPsXp88McnzO9qlp4jkBHF8fXPBKJdh8IjkFJH+R15DDhjl8BvFYuQHWrBA2AF0PNANIHggvmDPBPsPGJhg+ICaCeoGCkwQCpYLWhguaOC4oIPngh6aC2oIFxQaGLN7UHYOCv2zoX/Y9F+PvjnQty/6Bss/AhrHBAP/GOUf9PxShF8sNcIChV9w5kviByZ55EvidNF+Lyza2dcK/sWHfzXjXx7511v+BZzfIuA3MfhtFn4jiN+qiqIv97xabfeFUi/kGpK9lHDSs1um5KYuue1MboyTW/d7eFyYPn9ANj1/vAGhMDNHuA/PmwAAAABJRU5ErkJggg==') no-repeat;
  background-size: 100% 100%;
}
.small-loading {
  width: 0.4rem;
  height: 0.4rem;
  display: inline-block;
  vertical-align: middle;
  -webkit-animation: weuiLoading 1s steps(12, end) infinite;
  animation: weuiLoading 1s steps(12, end) infinite;
  background: transparent url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E9E9E9' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23989697' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%239B999A' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23A3A1A2' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23ABA9AA' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23B2B2B2' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23BAB8B9' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23C2C0C1' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23CBCBCB' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23D2D2D2' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23DADADA' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E2E2E2' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E") no-repeat;
  background-size: 100%;
}
@-webkit-keyframes weuiLoading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}

@keyframes weuiLoading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>