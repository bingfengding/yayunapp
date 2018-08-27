<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width :100%;
  min-height :100vh;
  height:100%;
  background: url("./image/app_bg.png")

}
</style>
