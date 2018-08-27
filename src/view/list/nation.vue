<template>
  <div id="nation">
    <header>
      <div class="box">
      <div  v-for="item in itemsA" 
        class="heaItem" 
        :class="isIndex===item.index?'active':''" 
        :key="item.index"
        @click="exposure(item.index)"
      >
        {{item.name}}
      </div>
    </div>
    </header>
    <div class="main">
      <ul>
        <li v-for="item in agcountry" :key="item.id" class="item">
          <div class="itemBox">
            <img :src="domain+item.image" alt="">
          <div class="itemCn">{{item.cn}}</div>
          </div>
          
        </li>
        </ul>
    </div>
  </div>
</template>
<script>
import {getcountry} from "api/home/home"
export default {
  data(){
    return {
      isIndex:3,
       itemsA:[
        {
          name:"今日赛程",
          index:1,
          url:"active"
        },
         {
          name:"赛程安排",
          index:2,
          url:"date"
        },
         {
          name:"参赛国家",
          index:3,
          url:"nation"
        }
      ],
      domain:"",
      agcountry:[
        {
          id:1,
          cn:"",
          image:""
        }
      ]
    }
  },
  created(){
    getcountry().then(res=>{
      let _base = res.data.data
      this.domain = _base[0].domain
      this.agcountry = _base[0].agcountry
    })
  },
  methods:{
    exposure(id){
      if(id == 1){
        this.$router.push("active")
      }else if(id==2) {
        this.$router.push("date")
      }else {
        this.$router.push("nation")
      }
    }
  }
  
}
</script>
<style lang="stylus" scoped>
#nation
  header
    position fixed
    top 1.94rem
    width 10.4rem
    background-color #3c332a
    .box
      display flex
      justify-content center
      .heaItem
        height 1.26rem
        width 100%
        text-align center
        line-height @height 
        a
          color #a99179
          display inline-block
          width 100%
          height 100%
      .active
        color #795228
        background url("../../image/list/btn_bg.png") no-repeat
        background-size 100% 100%
  .main
    padding-top 0.66rem
    ul
      //display flex
      //justify-content flex-start
      .item
        width 5rem
        height 2.4rem
        margin 0 0.4rem 0.4rem 0
        background-color #43392f
        border-radius 0.2rem
        display inline-block
        padding 0.4rem 0.2rem 0.4rem 0.6rem
        .itemBox
          width 100%
          height 100%
          display flex
          justify-content flex-start
          align-items center
          img
            width 1.6rem
            height 1.6rem
          .itemCn
            width 2.48rem
            display flex
            align-items center
            padding-left 0.4rem
      .item:nth-of-type(2n)
        margin-right 0
</style>
