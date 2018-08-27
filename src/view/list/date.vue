<template>
  <div id="date">
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
    <div class="header">
      <div class="itemName">项目名称</div>
      <div class="itemTime">赛程时间</div>
    </div>
    <ul class="main">
      <li v-for="item in items" :key="item.id" class="itemType">
        <div class="itemName">
          {{item.item}}
        </div>
        <div class="itemContent" v-if="item.isContent">
          <div>{{item.schedule[0].content}}</div>
          
        </div>
        <div class="itemContent" v-else>
          今日无赛事
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {getschedule} from "api/home/home"
export default {
  data(){
    return {
      isIndex:2,
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
      items:[
        {
          id:1,
          item:"",
          schedule:[
            {id:"",content:""}
          ]
        }
      ]
    }
  },
  created(){
    getschedule().then(res=>{
      let _base = res.data.data
      let _arr = []
      _base.forEach(value => {
        let _obj = {}
        _obj = value
        if(value.schedule[0]){
          _obj.isContent = true
        }else{
          _obj.isContent = false
        }
        _arr.push(_obj)
      });
      this.items = _arr
      
    })
  },
  methods:{
    exposure(id){
      //console.log(id)
      if(id == 1){
        this.$router.push("active")
      }else if(id==3) {
        this.$router.push("nation")
      }else {
        this.$router.push("date")
      }
    }
  },
  computed:{
       
    },
  watch:{
        
  },
  components:{
  
  }
}
</script>
<style lang="stylus" scoped>
#date
  padding-top 0.3rem
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
  .header
    height 1.2rem
    font-size 0.36rem
    display flex
    //justify-content flex-start
    background-color #362e26
    .itemName
      width 3rem
      height 1.2rem
      display flex
      justify-content center
      align-items center
      color #7d5224
    .itemTime
      width 7.4rem
      height 1.2rem
      display flex
      justify-content flex-start
      align-items center
      padding-left 1.6rem
      color #7d5224
  .main
    .itemType
      display flex
      justify-content space-between
      height 1.6rem
      .itemName
        display flex
        justify-content flex-start
        width 2.7rem
        height 1.6rem
        align-items center
        padding-left 0.4rem
      .itemContent
        padding 0.1rem 0.5rem 0.1rem 0.2rem
        display flex
        justify-content flex-start
        width 7.5rem
        height 1.6rem
        align-items center
        >div
          overflow:hidden; 
          text-overflow:ellipsis;
          display:-webkit-box; 
          -webkit-box-orient:vertical;
          -webkit-line-clamp:3;
          font-size 0.30rem
          max-height 1.4rem
    .itemType:nth-of-type(2n+1)
      background-color #43392f
    .itemType:nth-of-type(2n+2)
      background-color #3c332a
</style>
