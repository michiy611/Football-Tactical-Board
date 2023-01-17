<template>
  <div>
    <CreateImage/>
    <PlayerCircle/>
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
  margin-top: 60px;
}
</style>
