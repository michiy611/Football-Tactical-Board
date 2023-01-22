<template>
  <div class="container">
    <canvas id="myCanvas" :class="{eraser: canvasMode === 'eraser'}" ref="myCanvas" @mousedown="dragStart" @mouseup="dragEnd" @mouseout="dragEnd" @mousemove="draw"></canvas>
    <div id="tool-area">
      <fieldset>
        <input id="move-arc-button" @click="moveArc" class="radio-inline__input" type="radio" checked="checked"/>
        <label class="radio-inline__label" for="move-arc-button">
            DRAG
        </label>
        <input id="pen-black-button" @click="penBlack" class="radio-inline__input" type="radio"/>
        <label class="radio-inline__label" for="pen-black-button">
            BLACK
        </label>
        <input id="pen-red-button" @click="penRed" class="radio-inline__input" type="radio"/>
        <label class="radio-inline__label" for="pen-red-button">
            RED
        </label>
        <input id="pen-blue-button" @click="penBlue" class="radio-inline__input" type="radio"/>
        <label class="radio-inline__label" for="pen-blue-button">
            BLUE
        </label>
        <input id="eraser-button" @click="eraser" class="radio-inline__input" type="radio"/>
        <label class="radio-inline__label" for="eraser-button">
            ERASE
        </label>
        <input id="clear-button" @click="clear" class="radio-inline__input" type="radio">
        <label class="radio-inline__label" for="clear-button">
            CLEAR
        </label>
      </fieldset>
    </div>
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
      isMove: false,
      beforeMouseX: null,
      beforeMouseY: null,
      coords: [],
      selectIdx: 0,
      radius: window.innerWidth / 150,
      field_w: window.innerWidth * 0.6,
      field_h: window.innerWidth * 0.39,
      weightNum: 5,
      stroke: 'black',
      canvas: null,
      context: null,
      canvasMode: 'penBlack',
    } 
  },
  watch: {
    results: function() {
      this.coords = this.results      
      this.canvasMode = "drag"
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    coords: function() {
      // 円の描画
      for (let i = 0; i < this.coords.length; i++) {
        this.context.beginPath()
        this.context.arc(parseInt(this.coords[i].x * this.field_w / 115), parseInt(this.coords[i].y * this.field_h / 75), this.radius, 0, 2 * Math.PI)
        this.context.fillStyle = this.coords[i].color
        this.context.fill()
        this.context.lineWidth = 2
        this.context.strokeStyle = this.stroke
        this.context.stroke()
      }
    }

  },  
  mounted () {
    this.canvas = document.querySelector('#myCanvas')
    this.context = this.canvas.getContext('2d')
    this.context.lineCap = 'round'
    this.context.lineCap = 'round'
    this.canvas.width = this.field_w
    this.canvas.height = this.field_h
    this.context.lineWidth = this.weightNum
    this.context.strokeStyle = this.stroke
    
    console.log("field-width : ", this.field_w)
    console.log("field-height : ", this.field_h)
  },
  methods: {
    // 描画
    draw :function(e) {
      let x = e.offsetX
      let y = e.offsetY
      if(!this.isDrag) return;

      // dragモード
      if (this.canvasMode == "drag") {
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.context.clearRect(parseInt(this.coords[this.selectIdx].x * this.field_w / 115) - this.radius, parseInt(this.coords[this.selectIdx].y * this.field_h / 75) - this.radius, this.radius * 3, this.radius * 3);
        // this.context.clearRect(this.beforeMouseX - this.radius, this.beforeMouseY - this.radius, this.radius * 5, this.radius * 5);        

        if (!this.isMove) return
        var mouseX = x * this.ratio + this.dx
        var mouseY = y * this.ratio + this.dy
        var dx = 0
        var dy = 0
        if (this.beforeMouseX && this.beforeMouseY) {
            dx = mouseX - this.beforeMouseX
            dy = mouseY - this.beforeMouseY
        }
        this.beforeMouseX = mouseX
        this.beforeMouseY = mouseY
        var tempX = (dx  / this.field_w * 115) + Number(this.coords[this.selectIdx].x)
        var tempY = (dy / this.field_h * 75) + Number(this.coords[this.selectIdx].y)
        if (tempX > 0) this.coords[this.selectIdx].x = tempX
        if (tempY > 0) this.coords[this.selectIdx].y = tempY

        for (let i = 0; i < this.coords.length; i++) {
          
          this.context.beginPath()
          this.context.arc(parseInt(this.coords[i].x * this.field_w / 115), parseInt(this.coords[i].y * this.field_h / 75), this.radius, 0, 2 * Math.PI)
          this.context.fillStyle = this.coords[i].color
          this.context.fill()
          this.context.lineWidth = 2
          this.context.strokeStyle = this.stroke
          this.context.stroke()
        }
      } else { // dragモード以外
        this.context.lineTo(x, y);
        this.context.stroke();
      }
    },
    // 描画開始（mousedown）
    dragStart:function(e) {
      if (this.canvasMode == "drag") {
        this.isMove = true
        var minDistance = 1000
        var minIdx

        // クリックした位置に最も近い円のインデックスを取得
        for (var i = 0; i < this.coords.length; i++) {
          var dataX = parseInt(this.coords[i].x * this.field_w / 115)
          var dataY = parseInt(this.coords[i].y * this.field_h / 75)
          var mouseX = e.offsetX
          var mouseY = e.offsetY
          var distance = Math.sqrt( Math.pow( mouseX-dataX, 2 ) + Math.pow( mouseY-dataY, 2 ) )
          if (distance < minDistance) {
            minDistance = distance
            minIdx = i
          }
        }
        console.log("Selected index : ", minIdx)
        this.selectIdx = minIdx
      } else {
        let x = e.offsetX
        let y = e.offsetY
        this.context.beginPath();
        this.context.lineTo(x, y);
        this.context.stroke();
      }
      this.isDrag = true;
    },
    // 描画終了（mouseup, mouseout）
    dragEnd: function() {
      if (this.canvasMode == "drag") {
        this.isMove = false
        this.beforeMouseX = null
        this.beforeMouseY = null
      }

      this.isDrag = false;
    },
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // ドラッグモード
    moveArc: function() {
      this.canvasMode = 'drag'
      this.context.strokeStyle = '#00000000';
      // this.context.strokeStyle = '#000';
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
 background-size: contain;
 background-image: url('~@/assets/field.jpg');
 background-repeat:no-repeat;
}
.eraser {
  cursor: url(../assets/eraser.png) 15 15,auto;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  text-align: center;
}

h1 {
  margin: 0;
  line-height: 1.2;
}

p {
  margin: 0 0 1.6rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #ddd;
}

.radio-inline__input {
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute !important;
}

.radio-inline__label {
    display: inline-block;
    padding: 0.5rem 1rem;
    border: 1px solid #fff;
    color: #fff;

    margin-right: 18px;
    border-radius: 3px;
    transition: all .2s;
}

.radio-inline__input:checked + .radio-inline__label {
    /* background: #B54A4A; */
    /* border: 1px solid #fff; */

    color: #fff;
    text-shadow: 0 0 1px rgba(0,0,0,.7);
}

.radio-inline__input:focus + .radio-inline__label {
    outline-color: #4D90FE;
    /* background: #B54A4A; */
    background: #B54A4A;

    outline-offset: -2px;
    outline-style: auto;
    outline-width: 5px;
}
</style>