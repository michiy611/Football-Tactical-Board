<template>
  <div class="container">
    <!-- SVG定義 -->

    <!-- <div class="board"> -->
      <!-- <div class="board-area"> -->
        <canvas id="myCanvas" :class="{eraser: canvasMode === 'eraser'}" ref="myCanvas" @mousedown="dragStart" @mouseup="dragEnd" @mouseout="dragEnd" @mousemove="draw">
      <!-- <svg class="circle">
        <circle v-for="(r, idx) in coords" :key="idx"
          @mousedown="move($event, idx)"
          :fill="r.color" :stroke="stroke"
          :cx="parseInt(r.x * field_w / 115)" :cy="parseInt(r.y * field_h / 75)" :r="radius">
        </circle>
      </svg> -->
        </canvas>
        <div id="tool-area">
          <button id="pen-black-button" @click="penBlack">ペン（黒）</button>
          <button id="pen-red-button" @click="penRed">ペン（赤）</button>
          <button id="pen-blue-button" @click="penBlue">ペン（青）</button>
          <button id="eraser-button" @click="eraser" >消しゴム</button>
          <button id="clear-button" @click="clear">クリア</button>
        </div>
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>

export default {
  props: ['results'],
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
      radius: window.innerWidth / 150,
      coords: [],
      stroke: 'black',
      field_w: window.innerWidth * 0.6,
      field_h: window.innerWidth * 0.39,

      weightNum: 5,
      canvas: null,
      pen_color: "black",
      context: null,
      canvasMode: 'penBlack',
    } 
  },
  watch: {
    results: function() {
      this.coords = this.results
    }
  },  
  // マウス操作関連
  mounted () {
    console.log('MOUNT LISTENER ON')
    console.log(this.field_w)
    console.log(this.field_h)
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('mousemove', this.mouseMove)

    this.canvas = document.querySelector('#myCanvas')
    this.context = this.canvas.getContext('2d')
    this.context.lineCap = 'round'
    this.context.lineCap = 'round'
    // this.canvas.width = 700
    // this.canvas.height = 600
    this.canvas.width = this.field_w
    this.canvas.height = this.field_h
    this.context.lineWidth = this.weightNum
    this.context.strokeStyle = this.color
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
      var tempX = dx + Number(this.coords[this.selectIdx].x)
      var tempY = dy + Number(this.coords[this.selectIdx].y)
      //var tempX = dx + Number(this.polygons[this.selectIdx].x)
      //var tempY = dy + Number(this.polygons[this.selectIdx].y)
      if (tempX > 0) this.coords[this.selectIdx].x = tempX
      if (tempY > 0) this.coords[this.selectIdx].y = tempY
      e.preventDefault()
    },
    // 描画
    draw :function(e) {
      // let x = e.layerX
      // let y = e.layerY
      let x = e.offsetX
      let y = e.offsetY
      if(!this.isDrag) return;
      this.context.lineTo(x, y);
      this.context.stroke();
    },
    // 描画開始（mousedown）
    dragStart:function(e) {
      // let x = e.layerX
      // let y = e.layerY
      let x = e.offsetX
      let y = e.offsetY
      this.context.beginPath();
      this.context.lineTo(x, y);
      this.context.stroke();
      this.isDrag = true;
      // this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)

    },
    // 描画終了（mouseup, mouseout）
    dragEnd: function() {
      this.context.closePath();
      this.isDrag = false;
    },
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // ペンモード（黒）
  penBlack: function(){
    // カーソル変更
    this.canvasMode = 'penBlack'
 
    // 描画設定
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.lineWidth = 5;
    this.context.strokeStyle = '#000000';
  },
  // ペンモード（赤）
  penRed: function(){
    // カーソル変更
    this.canvasMode = 'penRed'
 
    // 描画設定
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.lineWidth = 5;
    this.context.strokeStyle = '#FF0000';
  },
  // ペンモード（青）
  penBlue: function(){
    // カーソル変更
    this.canvasMode = 'penBlue'
 
    // 描画設定
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.lineWidth = 5;
    this.context.strokeStyle = '#0000FF';
  },
    // 消しゴムモード
    eraser: function() {
      // カーソル変更
      this.canvasMode = 'eraser'
 
      // 描画設定
      this.context.lineCap = 'square';
      this.context.lineJoin = 'square';
      this.context.lineWidth = 30;
      this.context.strokeStyle = '#FFFFFF';
    }
  },

}
</script>

<style scoped>
* {
  text-align: center;
}

#myCanvas {
 border: 1px solid #000000;
 /* width: 60%;
 height: 250%; */

 background-size: contain;
 background-image: url('~@/assets/field.jpg');
 background-repeat:no-repeat;
}

.eraser {
  cursor: url(../assets/eraser.png) 15 15,auto;
}
/* .board {
  /* background-color: silver; */
  /* height: 1000px; */
/* } */

/* .circle {
  z-index: 10;
} */

/* .board-area {
  /* width : 60%; */
  /* height: 200%; */
/* }  */

/* svg {
  width : 60%;
  height: 200%;
  background-size: contain;
  /* background: url('~@/assets/field.jpg'); */
  /* background-image: url('~@/assets/field.jpg');
  background-repeat:no-repeat;
  padding-bottom: 40%;
} */ 
</style>