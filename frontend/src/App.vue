<template>
  <div>
    <div class="text">Tactical Board</div>
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
