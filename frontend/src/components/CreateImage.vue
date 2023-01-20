<template>
  <div id="app">
    <label for="input-video">{{ isLoading ? '読み込み中...' : '動画を選択'}}</label>
    <input id="input-video" type="file" accept="video/mp4,video/x-m4v" @change="handleFileSelect">
    <video controls v-if="src" id="video">
      <source :src="src" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    </video>
    <img class="image" :src="image"/>
    <!-- <input type="file" :src="image"/> -->
    <!-- <input type="file" :src="image" style="display: none;"/> -->
    <!-- <input type="button" value="一時停止" @click="setCurrentTime()"/> -->
    <button id="snap" @click="onUploadImage()">このシーンをインポート</button>
    <h2>Results</h2>
    <!-- <ul>
      <li v-for="result in results" :key="result.id"> {{ result }}</li>
    </ul> -->
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000'

export default {
  // delimiters: ['[[', ']]'],
  data() {
    return {
      src: null,
      image: [],
      time: 0,
      isLoading: false,
      uploadedImage: '',
      results: []
    }
  },
  methods: {
    handleFileSelect(event) {
      // reset data
      this.src = null
      // this.thumbnails = []
      this.selected = 0
      
      // varidate file
      const file = event.target.files[0]
      if (!file || !file.type.match('video/*')) return

      // read file
      const reader = new FileReader()
      reader.onload = (evt) => {
        this.src = evt.target.result
        this.isLoading = false
      }
      reader.readAsDataURL(file)
      this.isLoading = true
    },
    // 動画を停止してその時点での画像を取得
    onUploadImage() {
      let self = this
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
      this.image.push(canvas.toDataURL('image/png'))

      // let reader = new FileReader()
      // reader.onload = (e) => {
      //   this.uploadedImage = e.target.result
      // }

      // console.log(this.uploadedImage)
      // reader.readAsDataURL(this.image)

      // 画像をサーバーへアップロード
      var params = new FormData()
      params.append('image', this.image)
      // params.append('image', this.uploadedImage)
      // Axiosを用いてFormData化したデータをFlaskへPostしています。
      axios.post(`${API_URL}/detect`, params).then(function (response) {
        self.results = response.data.results;
        for (const result of self.results) {
          console.log(result)
        }
        
      })

      this.$emit('my-click', this.results)
    }
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