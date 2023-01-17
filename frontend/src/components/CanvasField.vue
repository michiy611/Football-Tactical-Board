<template>
    <div>
        <div class="container">
            <canvas id="canvas"></canvas>
            <hr>
            <label>
                画像
                <input type="file" class="form-control" id="image">
            </label>
            <button id="run">
                submit
            </button>
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
    onUploadMovie () {
      var params = new FormData()
      params.append('video', this.src)
      // Axiosを用いてFormData化したデータをFlaskへPostしています。
      axios.post(`${API_URL}/classification`, params).then(function (response) {
        console.log(response)
      })
    },
    // お絵描き
    drawImage(src) {
        var canvas = document.getElementById("canvas")
        var context = canvas.getContext('2d')
        var image = new Image()
        image.src = src;
        image.onload = function() {
            canvas.width = image.width
            canvas.height = image.height
            context.drawImage(image, 0, 0)
        }
    }
  }
}
</script>