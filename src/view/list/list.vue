<template>
  <div id="list">
    <header-top></header-top>
    <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore"> -->
      <div class="main">
        <!-- <header>
          <div class="box">
          <div  v-for="item in items" 
            class="heaItem" 
            :class="isIndex===item.index?'active':''" 
            :key="item.index"
            @click="exposure(item.index)"
          >
            <router-link :to="item.url">{{item.name}}</router-link>
          </div>
        </div>
        </header>  -->
        <router-view></router-view>
      </div>
    <!-- </mt-loadmore> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import headerTop from "@/components/header"
export default {
  data(){
    return{
      domain:"",
      isIndex:1,
      // items:[
      //   {
      //     name:"今日赛程",
      //     index:1,
      //     url:"active"
      //   },
      //    {
      //     name:"赛程安排",
      //     index:2,
      //     url:"date"
      //   },
      //    {
      //     name:"参赛国家",
      //     index:3,
      //     url:"nation"
      //   }
      // ],
      created() {
        console.log(1)
      },
      // computed:{
      //   ...mapGetters([
      //     'doneTabId',
      //   ]),
       
      // },
      // watch:{
      //    $route(to,from){
      //     console.log(to);
      //   },
      //   'doneTabId' : function(li){
      //     let _base = this.$store.getters.doneTabId
      //     this.isIndex = _base
      //   }
      // }

    }
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
    //暴露标签id
    // exposure(id){
    //   this.$store.commit("setTabNames",{tabName:this.items[id-1].name})
    //   this.isIndex = id
    // }
  },
   watch: {
    '$route' (to, from) {
    
    }
  },
  components:{
    headerTop
  }
}

</script>
<style lang="stylus" scoped>
#list
  font-size 0.36rem
  padding 3.11rem 0.2rem 0.2rem 0.2rem
  .main
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
      
</style>


