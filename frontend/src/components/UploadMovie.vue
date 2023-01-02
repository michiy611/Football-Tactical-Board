<template>
  <div>
    <div class="input-area">
      <label for="input-video">{{ isLoading ? '読み込み中...' : '動画を選択'}}</label>
      <input id="input-video" type="file" accept="video/mp4,video/x-m4v" @change="handleFileSelect">
      <video controls v-if="src">
        <source :src="src" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
      </video>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000'
export default {
  data () {
    return {
      src: '',
      isLoading: false
    }
  },
  methods: {
    // ファイルのチェックと読み込み
    handleFileSelect(event) {  
      // ファイルのチェック
      const file = event.target.files[0]
      if (!file || !file.type.match('video/*')) return
      // ファイルの読み込み
      const reader = new FileReader()
      reader.onload = (evt) => {
        this.src = evt.target.result
        // this.createThumbnails(this.src)
        this.isLoading = false
      }
      reader.readAsDataURL(file)
      this.isLoading = true
    },
    // 動画をサーバーへアップロード
    onUploadImage () {
      var params = new FormData()
      params.append('video', this.src)
      // Axiosを用いてFormData化したデータをFlaskへPostしています。
      axios.post(`${API_URL}/classification`, params).then(function (response) {
        console.log(response)
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
</style>