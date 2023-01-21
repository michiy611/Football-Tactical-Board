<template>
  <div id="app">
    <!-- <h1 class="text">Tactical Board</h1> -->
    <!-- <CreateImage/> -->
    <TitleHeader/>
    <CreateImage @my-click="emitData"/>
    <!-- <PlayerCircle :results="results"/> -->
    <CanvasField :results="results"/>
  </div>
</template>

<script>
// import PlayerCircle from './components/PlayerCircle.vue'
import CreateImage from './components/CreateImage.vue'
import TitleHeader from './components/TitleHeader.vue'
import CanvasField from './components/CanvasField.vue'

export default {
  name: 'App',
  components: {
    TitleHeader,
    CreateImage,
    // PlayerCircle,
    CanvasField
},
  data() {
    return {
      results: []
    }
  },
  methods: {
    emitData(results) {
      this.results = results;
    },
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
  background-color: #2c3e50;
  height: 150em;
}

.text {
  height:50px;
  width:100%;
  font-size:35px;
  text-align: center;
  background-color: tomato;
}
</style>
