<template>
  <div id="movie">
    <header-top></header-top>
    <div class="main">
      <header>
        <div v-for="(item,index) in videoList" :key="item.id" class="itemTitle" :class="index===isActive?'active':''" @click="active(item.id,index)">
          {{item.item}}
        </div>
      </header>
      <div v-if="isMainShow">

   
      <div class="videoBox" v-show="dialogVisible" @click="closePlay">
        <div class="model"
        >
        <player 
          :video-url="videoUrl" 
          :state="state">
        </player>
        </div>
      </div>
      <div class="detailed" v-for="(item,index) in videoList[isActive].video" :key="item.id">
      <div 
      class="detailedImg"
      @click="openVideo(index,item.url)">
        <img :src="domain+item.image" alt="">
        <div class="trigonometric">
          <img src="../image/movie/palybutton.png" alt="">
        </div>
      </div>
        <div class="detailedText">
          {{item.title}}
        </div>
      </div>
      </div>
      <div v-else class="main"> 
      <div class="notMain">
        视频筹备中...
      </div>
    </div>
    </div>
    
  </div>
</template>
<script>
import headerTop from "@/components/header"
import {getvideo} from "api/home/home"
import player from './player'
export default {
  data(){
    return {
      dialogVisible:false,
      videoUrl:"http://yun.it7090.com/video/XHLaunchAd/video01.mp4",//视频链接
      state:false,//关闭赋值
      isActive:0,
      domain:"",
      isMainShow:true,
      videoList:[{
        id:1,
        item:"",
        video:[
          {
          ag_items_id:0,
          id:0,
          image:"",
          title:"",
          url:""
        }
        ]
      }]
    }
  },
  created(){
    getvideo().then(res=>{
      let _base = res.data.data
      console.log(_base)
      this.domain = _base.domain
      if(_base.videoList[0].length){
  
        this.videoList = _base.videoList
        this.isMainShow = true
      }else{

        this.videoList = _base.videoList
        this.isMainShow = false
      }
      
      
    })
  },
  methods:{
    active(id,index){
      this.isActive = index
      let _len =  this.videoList[index].video.length
      if(_len){
        this.isMainShow = true
      }else {
        this.isMainShow = false
      }
    },
     openVideo(index,url){
       console.log(index,url)
      this.dialogVisible = true
      this.videoUrl = url
      console.log(this.videoUrl)
      this.state = false
    },
    closePlay(){
      this.dialogVisible =false
      this.state = true
      console.log(this.state)
      this.videoUrl = ""
      
    }
  },
  components:{
    headerTop,
    player
  }
}
</script>
<style lang="stylus" scoped>
#movie
  font-size 0.32rem
  .main
    padding 4.5rem 0.2rem 0.2rem 0.2rem
    .notMain
      font-size 1rem
      text-align center
    header
      position fixed
      top 1.95rem
      width 100%
      background-color #2e2924
      padding 0 0.2rem
      left 0
      right 0
      z-index 9
      .itemTitle
        font-size 0.36rem
        display inline-block
        margin 0 0.3rem 0.2rem 0
        width 3.26 rem
        height 1rem
        border-radius 8px
        background-color #43392f
        line-height 1rem
        text-align center
      .itemTitle:nth-of-type(3n)
        margin-right 0
      .itemTitle.active
        background url("../image/movie/textbutton.png") no-repeat
        background-size 100% 100%
        color #795228
    .videoBox
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      z-index 1002
      .model
        position fixed
        top 0
        width 100%
        left 0
        right 0
        
    .detailed
      width 5rem
      display inline-block
      .detailedImg
        width 100%
        height 3.6rem
        position relative
        img 
          width 100%
          height 100%
      .trigonometric
        position absolute
        width 0.9rem
        height 0.9rem
        top 50%
        left 50%
        transform translate(-50%,-50%)
        img 
          width 100%
          height 100%
    .detailed:nth-of-type(2n)
      margin-right 0.4rem
    .detailedText
      padding 0 0.2rem
      height 1rem
      display flex
      justify-content center
      align-items center

          

</style>
