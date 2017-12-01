/*!
 * audio-player v0.1.0
 * (c) 2017-2017 Clay
 * Released under the MIT License.
 */
function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

__$styleInject("\r\n* {\r\n  margin: 0;\r\n}\r\n.audio-player {\r\n  position: relative;\r\n}\r\n.audio-player--audio {\r\n  display: none;\r\n  visibility: hidden;\r\n  opacity: 0;\r\n}\r\n.audio-bg {\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow: hidden;\r\n}\r\n.audio-bg--img {\r\n  width: 100%;\r\n}\r\n.audio-bar {\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n.audio-bar__time {\r\n  padding: 0 20px 0 20px;\r\n  color: #eee;\r\n  height: 36px;\r\n  line-height: 36px;\r\n}\r\n.audio-bar__progress {\r\n  position: relative;\r\n  -webkit-box-flex: 1;\r\n  -webkit-flex: 1;\r\n          flex: 1;\r\n  margin: 10px 20px 10px 0;\r\n  border-radius: 2px;\r\n}\r\n.audio-bar__loading {\r\n  position: absolute;\r\n  z-index: 1;\r\n  left: -15px;\r\n  top: 0px;\r\n}\r\n.audio-bar__progress-box {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 0;\r\n  right: 0;\r\n  -webkit-transform: translateY(-50%);\r\n          transform: translateY(-50%);\r\n  border-radius: 4px;\r\n  overflow: hidden;\r\n}\r\n.audio-bar__progress--bg {\r\n  height: 4px;\r\n  background-color: #777;\r\n}\r\n.audio-bar__progress--now {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 0;\r\n  height: 4px;\r\n  background-color: #fff;\r\n}\r\n.audio-bar__btn {\r\n  position: absolute;\r\n  left: 20px;\r\n  bottom: 40px;\r\n  width: 40px;\r\n  height: 40px;\r\n  color: #fff;\r\n  -webkit-tap-highlight-color: transparent;\r\n}\r\n.audio-bar__btn.play {\r\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAolBMVEUAAAAAAAD9/f0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f0AAAD6+vpTU1Pw8PDr6+u3t7ewsLCBgYFjY2Pp6enY2NjV1dXIyMj+/v77+/v4+Pj29vb09PTt7e3l5eXi4uLR0dHNzc3CwsK/v7+np6dwcHA2Njb7+/vy8vLt7e3t7e3d3d27u7srKyv///8R4QqsAAAANXRSTlMzAPUwLQcEHisSDiclGBYPIfcd7EXPwXhyVkq9npmJ+vDm3drIs66UjoGAa0498dLJxad8O7UE/foAAAJKSURBVFjDzdnpUtswFIbhr5Ys70tishCSsralQPfq/m+tbKmGytbRkRqG5z/vTAZZlo7xzk2VbVbnQgBC5nXWlor4A2ewm+ew5PMuLFj2AhNEX7KDrYSTbFnBRoAkGu9gIeFFFl7BtIa3OqWDhQCDKKhgBqbeGVQV2Co1HUwlAsjUDppedBFEj100QSURTKqRYIUIlR3MECX7N1jAtr5MLj/BU/EymApYjvWDxTG8iPRFsIZtqZ9cw0ttguM/GIN+9v3O80eboMSIRO+d3sCDNMEG40FjewRa8zcoyKBO3oMk9sEW00FjuQGlfQ5Kr6BOViDIp2AJd9DYgVA+BnsqaHwjVnn/GBR00Lj+DQfxEOzACephDYfuPpgRQYtrv8jug5Ib1Is7x/8ZCuygPp1e5QolI2gspx7FDk1QUJ/dYlSDjBc0fmwwIkMVGtSzG9gq5OygsYUlh4gIanu7EHHBi5EgYoIJCNzgDDYRExxGcjImuLODUcvmCpYcVXjwI2xV+KN3sRp/9JrA4MQO1gRuX8Pt5PalQoIfvmCCCnkFJL8wRRIvKWK3tmX81+hsC4eO/aI/OYKD4B5FZp/h1DMPS1cbuJWs45z+CYJkHTiHNSgtcSS21jJBMA7tXtefhrhWzKyNyk1SF5+zfe7rCj4K6mq2MGvZR01eHtdmLXsQKX293Z0n5ycb+CkOewGPHxEceIgRP2Y58CDIFHMEyNNXGKYZczDNqYFkxxtIdgcdmcYPdV997GwoejCu/u/o/i18XLA+fwivzx9/AIAT35xYsL7EAAAAAElFTkSuQmCC') no-repeat;\r\n  background-size: 100% 100%;\r\n}\r\n.audio-bar__btn.pause {\r\n  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAASFBMVEUAAAAAAACbm5sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc3NwAAAD7+/v9/f3q6up5eXlYWFgbGxv8/Pzy8vLy8vL///+mywzUAAAAF3RSTlMzAGMuBioXDiAlEh2lEPH5v1JGOPHU02yQnmwAAAGXSURBVFjDzdnJEoMgEATQNsMqmn35/z9NYg6UCyKhD/aRwyuoUhgGNOtR1gSvBYBo7YOxqlnPKmiDxiw62P9A65CMs8WgEaxGTArMcXkyD7aCTZF2E6g8NserPNgKCiJtDnQojFsFlUZxtJqBVV4U56AS/BVRMzB61SLq1htXPQc1KqLnoENV3BRsUZl2DCqpBUWNQI/q+AjGBVcuOoLCACWCBku5dcfT+YpJrufTvbthKWYA0xPsXp88McnzO9qlp4jkBHF8fXPBKJdh8IjkFJH+R15DDhjl8BvFYuQHWrBA2AF0PNANIHggvmDPBPsPGJhg+ICaCeoGCkwQCpYLWhguaOC4oIPngh6aC2oIFxQaGLN7UHYOCv2zoX/Y9F+PvjnQty/6Bss/AhrHBAP/GOUf9PxShF8sNcIChV9w5kviByZ55EvidNF+Lyza2dcK/sWHfzXjXx7511v+BZzfIuA3MfhtFn4jiN+qiqIv97xabfeFUi/kGpK9lHDSs1um5KYuue1MboyTW/d7eFyYPn9ANj1/vAGhMDNHuA/PmwAAAABJRU5ErkJggg==') no-repeat;\r\n  background-size: 100% 100%;\r\n}\r\n.small-loading {\r\n  width: 16px;\r\n  height: 16px;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  -webkit-animation: weuiLoading 1s steps(12, end) infinite;\r\n  animation: weuiLoading 1s steps(12, end) infinite;\r\n  background: transparent url(\"data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E9E9E9' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23989697' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%239B999A' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23A3A1A2' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23ABA9AA' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23B2B2B2' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23BAB8B9' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23C2C0C1' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23CBCBCB' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23D2D2D2' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23DADADA' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E2E2E2' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E\") no-repeat;\r\n  background-size: 100%;\r\n}\r\n@-webkit-keyframes weuiLoading {\r\n  0% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\r\n            transform: rotate3d(0, 0, 1, 0deg);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\r\n            transform: rotate3d(0, 0, 1, 360deg);\r\n  }\r\n}\r\n\r\n@keyframes weuiLoading {\r\n  0% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\r\n            transform: rotate3d(0, 0, 1, 0deg);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\r\n            transform: rotate3d(0, 0, 1, 360deg);\r\n  }\r\n}\r\n",undefined);

var AudioPlayer$1 = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"audio-player",style:({ width: _vm.width + 'px', height: (_vm.height || _vm.boxWidth) + 'px' })},[_c('audio',{staticClass:"audio-player--audio",attrs:{"controls":"","title":"sleep_alone","meta":"sleep_alone","src":_vm.audio}}),_vm._v(" "),_c('div',{staticClass:"audio-bg"},[_c('img',{staticClass:"audio-bg--img",attrs:{"src":_vm.img,"alt":""}})]),_vm._v(" "),_c('div',{staticClass:"audio-bar"},[_c('div',{staticClass:"audio-bar__time",domProps:{"innerHTML":_vm._s(_vm.timeFormatter(_vm.currentTime))}}),_vm._v(" "),_c('div',{staticClass:"audio-bar__progress",on:{"touchmove":function($event){_vm._barTouchmove($event);},"touchend":function($event){_vm._barTouchend($event);}}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.loaded),expression:"!loaded"}],staticClass:"small-loading audio-bar__loading"}),_vm._v(" "),_c('div',{staticClass:"audio-bar__progress-box"},[_c('div',{staticClass:"audio-bar__progress--bg"}),_vm._v(" "),_c('div',{staticClass:"audio-bar__progress--now",style:({ width: _vm.currentTime/_vm.duration*_vm.progressWidth + 'px' })})])]),_vm._v(" "),_c('div',{class:['audio-bar__btn', { 'play': !_vm.playing, 'pause': _vm.playing }],on:{"click":_vm._audioPlay}})]),_vm._v(" "),_c('div',{staticClass:"audio-bar"})])},
staticRenderFns: [],
  name: 'audio-player',
  data: function data () {
    return {
      duration: 0,
      currentTime: 0,
      boxWidth: 0,
      progressWidth: 0,
      touching: false,
      playing: false,
      loaded: false,
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
    timeFormatter: {
      type: Function,
      default: function default$1 (time) {
        var timeFormat = function (num) {
          if (num < 10) { return ("0" + num) }
          return num
        };
        var minute = timeFormat(Math.floor(time /60 % 60));
        var second = timeFormat(time % 3600 % 60);
        return (minute + ":" + second)
      }
    },
  },
  watch: {
    audio: function audio(val) {
      var this$1 = this;

      this.loadedTimeout = setTimeout(function () {
        this$1.loaded = false;
      }, 100);
      this.currentTime = this.$elAudio.currentTime = 0;
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      // 初始化背景图宽高
      this$1.boxWidth = this$1.$el.clientWidth;
      this$1.$elProgress = this$1.$el.querySelector('.audio-bar__progress');
      this$1.progressWidth = this$1.$elProgress.clientWidth;
      // 初始化音频总时长
      this$1.$elAudio = this$1.$el.querySelector('.audio-player--audio');
      this$1.$elAudio.addEventListener('durationchange', function () {
        this$1.duration = this$1.$elAudio.duration;
        this$1.audioInterval = setInterval(function () {
          if (!this$1.touching) {
            this$1.currentTime = Math.ceil(this$1.$elAudio.currentTime);
          }
        }, 1000);
      }, false);
      this$1.$elAudio.addEventListener('canplaythrough', function () {
        clearTimeout(this$1.loadedTimeout);
        this$1.loaded = true;
      }, false);
      this$1.$elAudio.addEventListener('pause', function () {
        this$1.playing = false;
      }, false);
    });
  },
  methods: {
    _barTouchmove: function _barTouchmove(e) {
      this.touching = true;
      var target = e.changedTouches[0];
      var diff = target.clientX - this.$elProgress.offsetLeft;
      var currentTime = Math.floor(diff / this.progressWidth * this.duration);
      this.currentTime = currentTime;
    },
    _barTouchend: function _barTouchend(e) {
      this.touching = false;
      var target = e.changedTouches[0];
      var diff = target.clientX - this.$elProgress.offsetLeft;
      var currentTime = Math.ceil(diff / this.progressWidth * this.duration);
      if (currentTime > this.duration) {
        currentTime = this.duration;
      }
      this.currentTime = this.$elAudio.currentTime = currentTime;
      this.play();
    },
    _audioPlay: function _audioPlay() {
      if (this.$elAudio.paused) {
        this.play();
        return
      }
      this.pause();
    },
    play: function play() {
      if (this.$elAudio.paused) {
        this.$elAudio.play();
        this.playing = !this.$elAudio.paused;
      }
    },
    pause: function pause() {
      if (!this.$elAudio.paused) {
        this.$elAudio.pause();
        this.playing = !this.$elAudio.paused;
      }
    }
  },
  destroy: function destroy () {
    clearInterval(this.audioInterval);
  }
};

export default AudioPlayer$1;
