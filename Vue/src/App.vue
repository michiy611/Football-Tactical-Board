<template>
  <div id="app">
    <TitleHeader/>
    <CreateImage @my-click="emitData"/>
    <CanvasField :results="results"/>
  </div>
</template>

<script>
import CreateImage from './components/CreateImage.vue'
import TitleHeader from './components/TitleHeader.vue'
import CanvasField from './components/CanvasField.vue'

export default {
  name: 'App',
  components: {
    TitleHeader,
    CreateImage,
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
