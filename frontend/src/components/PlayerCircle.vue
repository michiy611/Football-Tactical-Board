<template>
  <div class="container">
    <!-- SVG定義 -->
    <div class="board">
      <ul>
        <li v-for="result in results" :key="result.id"> {{ result }}</li>
      </ul>
      <!-- <div class="board-area"> -->
        <svg>
          <circle v-for="(r, idx) in rects" :key="idx"
            @mousedown="move($event, idx)"
            :fill="r.color" :stroke="r.stroke"
            :rx="r.rx"
            :cx="r.x" :cy="r.y" :r="radius">{{message}}
          </circle>
        </svg>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>

export default {
  props: 'results',
  data () {
    return {
      ratio: 1,
      dx: 0,
      dy: 0,
      viewport: '0 0 500 500',
      isMove: false,
      beforeMouseX: null,
      beforeMouseY: null,
      selectIdx: 0,
      radius: window.innerWidth / 90,
      rects: [
        {
          x: 30,
          y: 40,
          color: 'rgb(192, 192, 192)',
          stroke: 'black',
          team: 'home',
        },
        {
          x: 30,
          y: 50,
          color: 'red',
          stroke: 'black',
          team: 'away',
        },
      ],
    } 
  },
  // マウス操作関連
  mounted () {
    console.log('MOUNT LISTENER ON')
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('mousemove', this.mouseMove)
  },
  beforeUnmount () {
  // beforeDestroy () {
    console.log('MOUNT LISTENER OFF')
    document.removeEventListener('mouseup', this.mouseUp)
    document.removeEventListener('mousemove', this.mouseMove)
  },
  methods: {

    // 図形を動かすフラグを立てる
    move (e, i) {
      this.isMove = true
      this.selectIdx = i
      e.preventDefault()
    },
    // マウスのクリックが終わった段階で初期化
    mouseUp (e) {
      this.isMove = false
      this.beforeMouseX = null
      this.beforeMouseY = null
      e.preventDefault()
    },
    // move中は前回まで動かした差分を取りながら座標を変化させていく
    mouseMove (e) {
      if (!this.isMove) return
      var mouseX = e.offsetX * this.ratio + this.dx
      var mouseY = e.offsetY * this.ratio + this.dy
      var dx = 0
      var dy = 0
      if (this.beforeMouseX && this.beforeMouseY) {
          dx = mouseX - this.beforeMouseX
          dy = mouseY - this.beforeMouseY
      }
      this.beforeMouseX = mouseX
      this.beforeMouseY = mouseY
      var tempX = dx + Number(this.rects[this.selectIdx].x)
      var tempY = dy + Number(this.rects[this.selectIdx].y)
      //var tempX = dx + Number(this.polygons[this.selectIdx].x)
      //var tempY = dy + Number(this.polygons[this.selectIdx].y)
      if (tempX > 0) this.rects[this.selectIdx].x = tempX
      if (tempY > 0) this.rects[this.selectIdx].y = tempY
      e.preventDefault()
    },
    // drawImage(src) {
    //     var canvas = document.getElementById("canvas")
    //     var context = canvas.getContext('2d')
    //     var image = new Image()
    //     image.src = src;
    //     image.onload = function() {
    //         canvas.width = image.width
    //         canvas.height = image.height
    //         context.drawImage(image, 0, 0)
    //     }

    //     context.beginPath();
    //     context.arc(100, 100, 50, 0, 2 * Math.PI);
    //     context.fillStyle = "#00c2bc";
    //     context.fill();
    // }
  },

}
</script>

<style>
* {
  text-align: center;
}

.board {
  /* background-color: silver; */
  height: 700px;
}

/* .board-area {
  width : 60%;
  height: 700px;
} */

svg {
  width : 60%;
  height: 90%;
  background-size: contain;
  /* background: url('~@/assets/field.jpg'); */
  background-image: url('~@/assets/field.jpg');
  background-repeat:no-repeat;
  /* padding-bottom: 40%; */
}
</style>