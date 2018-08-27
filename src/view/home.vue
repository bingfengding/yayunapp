<template>
<!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore"> -->
  <div id="home">
    <div class="banner">
      <img :src="bannerImg" alt="">
    </div>
    <div class="medal">
      <div class="medalHeader">
        <img src="../image/home/textbutton.png" alt="">
      </div>
      <div class="medalMain">
        <div class="ranking">
          <div class="size" v-for="(item,index) in items" :key="index" :class="type[index].type">
            <div class="ball">
              <div class="ballCenter">
                <div class="ballBox"><img :src="domain+item.image" alt=""></div>
              </div>
               <div class="textCen ballText" :title="item.cn">{{item.cn}}</div>  
              
            </div>
            <div class="flag"><img :src="type[index].rankImg" alt=""></div>
            <div class="num">
              <div class="silverNum numBox">
                <div><img src="../image/home/silvermedal.png" alt=""></div>
                <div>{{item.silver}}</div>
              </div>
              <div class="goldNum numBox">
                 <div><img src="../image/home/goldmedal.png" alt=""></div>
                 <div>{{item.gold}}</div>
              </div>
              <div class="bronzeNum numBox">
                 <div><img src="../image/home/bronzemedal.png" alt=""></div>
                 <div>{{item.copper}}</div>
              </div>
            </div>
          </div>
          
        </div>
        <div class="podium">
          <div class="podiumBg">
          </div>
        </div>
      </div>
    </div>
    <div class="items">
      <div class="itemsBg">
        <div v-for="item in functionName" :key="item.id" class="funItem" @click="got(item.name)">
          <div>
            <router-link :to="item.url">
              <div class="funImg">
                <img :src="item.imgUrl" alt="">
              </div>
              <div class="funName">
                {{item.name}}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
   <!-- </mt-loadmore> -->
</template>
<script>
import BScroll from 'better-scroll'
import {getagmedaltable} from 'api/home/home'
export default {
  data(){
    return{
      domain:"",
      bannerImg:require("image/home/banner.png"),
      type:[
        {
          type: "silver",
          image:require("../image/home/silvermedal.png"),
          rankImg:require("../image/home/top2.png")
        },
       {
          type: "gold",
          image:require("../image/home/goldmedal.png"),
          rankImg:require("../image/home/top1.png")
          
        },{
          type: "bronze",
          image:require("../image/home/bronzemedal.png"),
          rankImg:require("../image/home/top3.png")
          
        },
        
        
      ],
      items:[
        {
          cn:"中国",
          image:"",
          id:1,
          gold:1,
          silver:1,
          copper:1
        },
        {
          cn:"日本",
          image:"",
          id:2,
          gold:1,
          silver:1,
          copper:1
        },
        {
          cn:"美国",
          image:"",
          id:3,
          gold:1,
          silver:1,
          copper:1
        }
      ],
      functionName:[
        {
          name:"今日赛程",
          imgUrl:require("../image/home/active.png"),
          url:"list/active",
          id:1
        },
        {
          name:"赛程安排",
          imgUrl:require("../image/home/date.png"),
          url:"list/date",
          id:2
        },
        {
          name:"参赛国家",
          imgUrl:require("../image/home/nation.png"),
          url:"list/nation",
          id:3
        },
        // {
        //   name:"快速投注",
        //   imgUrl:require("../image/home/fast.png"),
        //   url:"fast",
        //   id:4
        // },
        {
          name:"奖牌排行",
          imgUrl:require("../image/home/medal.png"),
          url:"medal",
          id:5
        },
        {
          name:"电竞团队",
          imgUrl:require("../image/home/team.png"),
          url:"team",
          id:6
        },
        {
          name:"精彩时刻",
          imgUrl:require("../image/home/movie.png"),
          url:"movie",
          id:7
        },
        {
          name:"优惠活动",
          imgUrl:require("../image/home/sale.png"),
          url:"sale",
          id:8
        },
        {
          name:"赛事新闻",
          imgUrl:require("../image/home/news.png"),
          url:"news",
          id:9
        },
      ]

    }
  },
  created(){
    getagmedaltable().then(res=>{  
      let _base = res.data.data
      this.domain = _base[0].domain
      let _arr = _base.map((item)=>{
        let _obj = {
          cn:"",
          image:"",
          id:0,
          gold:0,
          sliver:0,
          copper:0
        }
        _obj = {
          cn: item.country[0].cn,
          image:item.country[0].image,
          id:item.country[0].id,
          gold:item.gold,
          silver:item.silver,
          copper:item.copper
        }
        return _obj
      })
      let _arrFi = _arr.filter((item,index)=>{
        return index <3
      })
  
      if(_arrFi.length>1){
        _arrFi.splice(0,1,..._arrFi.splice(1,1,_arrFi[0]))
      }
      
      this.items = _arrFi
  
    })
  },
  mounted(){
   
 
  },
  methods:{
    loadTop() {
    // 加载更多数据
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // 加载更多数据
      this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    got(name){
      
      this.$store.commit("setTabNames",{tabName:name})
    },
   
  }
}
</script>
<style lang="stylus" scoped>
#home
  font-size 0.32rem
  .banner
    height 6.5rem
    img
      width 100%
      height 100%
  .medal
    height 5.4rem
    position relative
    .medalHeader
      text-align center
      position absolute
      top -0.6rem
      left 50%
      margin-left -3.35rem
      img
        width 6.70rem
        height 1.32rem
    .medalMain
      height 5.4rem
      position relative
      padding 0 2rem
      .podium
        display flex
        justify-content center
        .podiumBg
          position absolute
          bottom 0
          width 6.73rem
          height 5.06rem
          background url("../image/home/banjiangtai.png") no-repeat
          background-size 100% 100%
          background-position 0 1.46rem
      .ranking
        width 100%
        height 100%
        z-index 10
        position relative
        display flex
        justify-content flex-start
        display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
        display: -moz-flex; /* Firefox 18+ */
        display: -ms-flexbox; 
        .silver
          padding-top 1.2rem
        .gold
          padding-top 0.8rem
        .bronze
          padding-top 1.6rem
        .size
          width 2.10rem
          height 100%
          .flag
            display flex
            justify-content center
            margin-bottom 0.2rem
          .ball
            width 2.10rem
            margin-left 0.3rem
            margin-bottom 0.46rem
            .ballCenter
              width 100%
              display flex
              justify-content center
              text-align center
              .ballBox
                width 0.9rem
                height 0.9rem
                border-radius 50%
                overflow hidden
                margin-bottom 0.06rem
                display inline-block
                img 
                  width 100%
                  height 100%
            .ballText
              white-space nowrap
              text-overflow ellipsis
              overflow: hidden
              
          .num
            width 100%
            display flex
            justify-content space-between
            .numBox
              width 33.33% 
              >div
                text-align center
                img
                  width 0.19rem
                  height 0.25rem
          .flag
            img
              width 0.67rem
              height 0.9rem

  .items
    padding 0 0.20rem 0.20rem 0.20rem
    height 7.3rem
    position relative
    .itemsBg
      width 100%
      height 100%
      background url("../image/home/titlebg.png") no-repeat
      background-size 100% 100%
      .funItem
        width 33.33%
        height 33.33%
        display inline-block
        .funName
          text-align center
          color #f1c17d
          a
            color #f1c17d
        .funImg
          height 1.6rem
          line-height 1.6rem
          display flex
          justify-content center
          align-items center
          img
            max-width 0.7rem
            max-height 0.7rem
            
</style>
