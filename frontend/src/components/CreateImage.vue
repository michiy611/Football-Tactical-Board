<template>
  <div id="app">
    <label for="input-video">{{ isLoading ? '読み込み中...' : '動画を選択'}}</label>
    <input id="input-video" type="file" accept="video/mp4,video/x-m4v" @change="handleFileSelect">
    <video controls v-if="src" id="video">
      <source :src="src" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    </video>
    <img class="image" :src="image"/>
    <!-- <input type="button" value="一時停止" @click="setCurrentTime()"/> -->
    <button id="snap" @click="setCurrentTime()">このシーンをインポート</button>
  </div>
</template>

<script>


export default {
  data() {
    return {
      src: null,
      image: [],
      time: 0,
      isLoading: false
    }
  },
  methods: {
    handleFileSelect(event) {
      // reset data
      this.src = null
      this.thumbnails = []
      this.selected = 0
      
      // varidate file
      const file = event.target.files[0]
      if (!file || !file.type.match('video/*')) return

      // read file
      const reader = new FileReader()
      reader.onload = (evt) => {
        this.src = evt.target.result
        this.createThumbnails(this.src)
        this.isLoading = false
      }
      reader.readAsDataURL(file)
      this.isLoading = true
    },
    // 動画を停止してその時点での画像を取得
    setCurrentTime() {
      this.image = []
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const video = document.getElementById("video")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      this.time = video.currentTime
      // console.log(Math.ceil(this.time))
      video.pause()
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      this.image.push(canvas.toDataURL('image/jpeg'))
    },
  }
}
</script>

<style scoped>

.input-area {
  background: #20262E;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

input {
  display: none;
}

label {
  display: block;
  cursor: pointer;
  width: 100%;
  padding: 10px;
  text-align: center;
  color: #ccc;
  border: 2px dashed #ccc;
  background: #eee;
  box-sizing: border-box;
  transition: all 0.2s ease-out;
}

label:hover {
  background: #fafafa;
  padding: 20px 10px;
}

video {
  display: block;
  max-width: 50%;
  margin: 10px auto;
}

.image {
  width: 30%;
}

.thumbnail {
  width: 20%;
  height: 20%;
  box-sizing: border-box;
  border: 4px solid transparent;
  transition: all 0.2s;
}

/* .thumbnail-list.active {
  border: 4px solid #06c;
} */

</style>