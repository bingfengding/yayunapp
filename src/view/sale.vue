<template>
<div>
  <header-top></header-top>
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
    <div id="sale">
      
      <div class="content">
        <ul>
          <li class="item" v-for="item in list" :key="item.id">
            <img :src="domain+item.image" alt="">
            <div class="itemText">
              <p class="itemTitle">{{item.content}}</p>
              <!-- <div class="itemMain">{{item.content}}
              </div> -->
              <!-- <a :href="baseUrl" target="_blank">
              <div class="itemBtn">
                <img src="../image/sale/textbutton.png" alt=""></div>
                </a> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </mt-loadmore>
  </div>
</template>
<script>
import headerTop from "@/components/header"
import {getactivity} from 'api/home/home'
export default {
  data(){
    return {
      baseUrl:"http://cn.man257.com/promotions/index",
      domain:"",
      list:[{
        content:"",
        id:1,
        image:"",
        url:"",
        title:""
      }]
    }
  },
  created() {
    getactivity().then(res=>{
      let _base = res.data.data
      this.domain = _base.domain
      this.list = _base.agActivityList
    })
  },
  methods: {
   loadTop() {
    // 加载更多数据
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // 加载更多数据
      this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },

  },
  components: {
    headerTop,
    //scroll
  }
}
</script>
<style lang="stylus" scoped>
#sale
  padding-top 1.95rem
  font-size 0.32rem
  min-height 100vh
  .content
    padding 0 0.2rem
    .item
      width 100%
      height 3.46rem
      display flex
      justify-content space-between
      margin-bottom 0.3rem
      background url("../image/sale/activitybg.png") no-repeat
      background-size cover
      >img 
        width 4.72rem
        height 3.46rem
      .itemText
        width 5.66rem
        height 3.46rem
        padding 0.5rem
        position relative
        .itemTitle
          font-size 0.32rem
          //font-weight 400
          width 100%
          text-align justify
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //将元素设为盒子伸缩模型显示
          -webkit-box-orient: vertical; //伸缩方向设为垂直方向
          -webkit-line-clamp: 5;  //超出2行隐藏，并显示省略号
          margin-bottom 0.1rem
        .itemMain
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //将元素设为盒子伸缩模型显示
          -webkit-box-orient: vertical; //伸缩方向设为垂直方向
          -webkit-line-clamp: 2;  //超出2行隐藏，并显示省略号
        .itemBtn
          position absolute
          bottom 0.5rem
          img 
            width 3.34rem
            height 0.92rem
      
</style>
