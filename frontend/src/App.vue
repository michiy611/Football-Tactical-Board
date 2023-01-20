<template>
  <div>
    <div class="text">Tactical Board</div>
    <CreateImage @my-click="emitData()"/>
    <ul>
      <li v-for="result in results" :key="result.id"> {{ result }}</li>
    </ul>
    <h1>afafa</h1>
    <PlayerCircle :results="results"/>
  </div>
</template>

<script>
import PlayerCircle from './components/PlayerCircle.vue'
import CreateImage from './components/CreateImage.vue'

export default {
  name: 'App',
  components: {
    CreateImage,
    PlayerCircle,
  },
  data() {
    return {
      results: []
    }
  },
  methods: {
    emitData(results) {
      this.results = results;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

.text {
  height:50px;
  width:100%;
  font-size:35px;
  text-align: center;
  background-color: tomato;
}
</style>
