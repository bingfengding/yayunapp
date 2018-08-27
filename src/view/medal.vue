<template>
  <div id="medal">
    <header-top></header-top>
    <div class="main">
      <ul>
        <li class="baseItem">
          <div class="ranging item">排名</div>
          <div class="country item">国家</div>
          <div class="gold item">金牌</div>
          <div class="silver item">银牌</div>
          <div class="bronze item">铜牌</div>
          <div class="all item">总数</div>
        </li>
        <li class="itemBox" v-for="(item,index) in list" :key="item.country[0].id">
          <div class="ranging item">{{index+1}}</div>
          <div class="country item">{{item.country[0].cn}}</div>
          <div class="gold item">{{item.gold}}</div>
          <div class="silver item">{{item.silver}}</div>
          <div class="bronze item">{{item.copper}}</div>
          <div class="all item">{{item.total}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headerTop from "@/components/header"
import {getagmedaltable} from "api/home/home"
export default {
  data(){
    return {
      domain:"",
      list:[
        {
          domain:"",
          copper:"",
          gold:"",
          silver:"",
          total:"",
          country:[
            {
              cn:"",
              id:"",
              image:""
            }
          ]
        }
      ]
    }
  },
  created(){
    getagmedaltable().then(res=>{
      let _base = res.data.data
      console.log(_base)
      this.domain = _base[0].domain
      console.log(this.domain)
      this.list = _base
    })
  },
  components:{
    headerTop
  }
}
</script>
<style lang="stylus" scoped>
#medal
  padding 1.95rem 0.2rem 0.2rem 0.2rem
  font-size 0.32rem
  .main
    padding-top 0.65rem
    .ranging
      min-width 1.4rem
    .gold
      min-width 1.2rem
    .silver
      min-width 1.2rem
    .bronze
      min-width 1.2rem
    .all
      min-width 1.2rem
    .country
      min-width 3rem
    .item
      display flex
      align-items center
      justify-content center
      height 1.2rem
    .baseItem 
      display flex
      justify-content space-between
      background-color #362e26
      .item
        color #7d5224
        font-size 0.36rem
        line-height 0.36rem
    .itemBox
      display flex
      justify-content space-between
      .ranging
        font-weight bold
    .itemBox:nth-of-type(2n)
      background-color #43392f
    .itemBox:nth-of-type(2n+1)
      background-color #3c332a
    .itemBox:nth-of-type(4)
      .ranging
        color #ffc560
    .itemBox:nth-of-type(3)
      .ranging
        color #ffc560
    .itemBox:nth-of-type(2)
      .ranging
        color #ffc560

</style>
