<template>
  <div id="news">
    <header-top v-if="isShow"></header-top>
    <div class="header" v-else>
      <header>
      <div class="return">
        <div class="linkBox" @click="goreturn"> 
         
            <img src="../image/up.png" alt="">
        
        </div>
        
      </div>
      <div class="headerText">赛事新闻</div>
    </header>
    </div>
    
    <div class="main">
      <ul v-if="isShow">
        <li v-for="(item,index) in list" :key="index" class="item">
          <div :style="item.image? 'backgroundImage:url('+domain+ item.image +')' :''" class="itemBg"></div>
          
          <div class="content">
            <p>{{item.title}}</p>
            <div class="btn" @click="openContent(item.maincontent)">
              <img src="../image/sale/textbutton.png" alt="">
            </div>
          </div>
        </li>
      </ul>
      <div v-else>
        <div v-html="content" class="articleDetails
"></div>
      </div>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/header"
import {getnewsvideo} from "api/home/home"
export default {
  data(){
    return {
      content:"",
      isShow:true,
      baseImg:require("../image/news/Playpicture.png"),
      domain:"",
      list:[{
        id:0,
        maincontent:"",
        image:"",
        title:""
      }]
    }
  },
  created(){
    getnewsvideo().then(res=>{
      let _base = res.data.data.agNewsList
      this.domain = res.data.data.domain
      let _arr = []
      _base.forEach(element => {
        _arr.push(...element.news)
      });
      this.list =  _arr
      // console.log(this.list)
      // console.log(this.list[1].image)
    })
  },
  methods:{
    openContent(content){
      this.content = content
      this.isShow = false
    },
    goreturn(){
      this.isShow = true
    }
  },
  
  components:{
    headerTop
  }
}
</script>
<style lang="stylus" scoped>
#news
  padding-top 1.95rem
  font-size 0.32rem
  .main
    padding 0.6rem 0.2rem 0.2rem 0.2rem
    .item
      height 3.5rem
      margin 0.15rem 0
      display flex
      justify-content space-between
      background-color #43392f
      .itemBg
        width 4.7rem
        height 3.5rem
        background url("../image/news/Playpicture.png") no-repeat
        background-size cover
        display flex
        justify-content center
        align-items center
        img
          width 1rem
          height 1rem
      .content
        width 5.7rem
        position relative
        padding 0.3rem 0.5rem 0 0.5rem
        .btn
          width 3.34rem
          height 0.92rem
          position absolute
          top 2rem
          img
            width 100%
            height 100%
  .header
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
<style lang="stylus">
#news
  .articleDetails
    p,div,span,h1,h2,h3,h4,h5,h6
      font-size 0.32rem !important
      color #a99179 !important
      img
        max-width 100% !important
        height auto
</style>
