<template>
  <div id="header">
    <header>
      <div class="return">
        <div class="linkBox"> 
          <router-link to="/">
            <img src="../image/up.png" alt="">
          </router-link>
        </div>
        
      </div>
      <div class="headerText">{{message}}</div>
    </header>

      
      
  </div>
</template>
<script>
export default {
  data(){
    return{
      message:""
    }
  },
  computed:{

  },
  watch:{
    $route(to,from){
      // console.log(to)
      // console.log(from)
    }
  },
  created(){
    this.message = this.$route.name

  }

}
</script>
<style lang="stylus">
#header
  height 1.95rem
  width 100%
  background-color #2e2924
  font-size 0.42rem
  //line-height @height
  text-align center
  position fixed
  top 0
  right 0
  left 0
  z-index 999
  header
    width 100%
    height 100%
  .return
    position absolute
    width 0.3rem
    height 100%
    left 0.2rem
    display flex
    align-items center
    .linkBox
      img 
        width 100%
        height auto
  .headerText
    line-height 1.95rem
</style>

