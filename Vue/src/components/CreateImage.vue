<template>
  <div>
    <label class="input-area" for="input-video">{{ isLoading ? 'Loading...' : 'Upload Video'}}</label>
    <input id="input-video" type="file" accept="video/mp4,video/x-m4v" @change="handleFileSelect">
    <video controls v-if="src" id="video">
      <source :src="src" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    </video>
    <a class="btn uploadbtn" @click="onUploadImage()"><span>Capture this moment!!!</span></a>
    <h3 class="wait">Wait about 5 seconds...</h3>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000'

export default {
  data() {
    return {
      src: null,
      image: [],
      uploadedImage: '',
      results: [],
      time: 0,
      isLoading: false,
    }
  },
  methods: {
    handleFileSelect(event) {
      // データの初期化
      this.src = null
      this.selected = 0
      
      // ファイルのチェック
      const file = event.target.files[0]
      if (!file || !file.type.match('video/*')) return

      // ファイルの読み込み
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
      video.pause()
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      this.image.push(canvas.toDataURL('image/png'))


      // 画像をサーバーへアップロード
      var params = new FormData()
      params.append('image', this.image)
      // Axiosを用いてFormData化したデータをFlaskへPOST。
      axios.post(`${API_URL}/detect`, params).then(function (response) {
        self.results = response.data.results;
        for (const result of self.results) {
          console.log(result)
        }
        self.$emit('my-click', self.results)
      })
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
  font-size: 2em;
  display: block;
  cursor: pointer;
  width: 60%;
  padding: 10px;
  text-align: center;
  color: #ccc;
  border: 2px dashed #ccc;
  background: #eee;
  box-sizing: border-box;
  transition: all 0.2s ease-out;
  margin-left: 20%;
  margin-bottom: 1.5em;
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

.btn
{
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

.uploadbtn {
  overflow: hidden;

  padding: 1.5rem 6rem;
  margin-bottom: 2rem;
  color: #fff;
  border-radius: 0;
  background: #000;
}

.uploadbtn span {
  position: relative;
}

.uploadbtn:before {
  position: absolute;
  top: 0;
  left: 0;

  width: 100px;
  height: 100px;

  content: '';
  -webkit-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
  -webkit-transform: translateX(-80%) translateY(-25px);
  transform: translateX(-80%) translateY(-25px);

  border-radius: 50%;
  background: #eb6100;
}

.uploadbtn:hover:before {
  width: 400px;
  height: 400px;

  -webkit-transform: translateX(-1%) translateY(-175px);

  transform: translateX(-1%) translateY(-175px);
}
.wait {
  color: #fff;
  margin-bottom: 3em;
}

</style>