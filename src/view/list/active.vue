<template>
  <div id="active">
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
      <div class="model">
      <div class="mainHeader">
        <div class="before">
          <div  v-show="!beforeHide"  @click="before"><img src="../../image/active/up.png" alt="">
          <span>前一天</span></div>
          
        </div>
        <div class="titleText">{{dateMessage}}</div>
        <div class="after" >
          <div  v-show="!afterHide" @click="after"><img src="../../image/active/next.png" alt="">
          <span>后一天</span></div>
          
        </div>
      </div>
      </div>
      <div class="content">
        <div>
          <div 
          v-for="item in list" 
          :key="item.id" 
          class="contentBox">
            <div class="contentName">
              {{item.item}}
            </div>
            <div class="contentRight" v-if="item.event == '今日无该项赛事'">
              <div class="nothing">{{item.event}}</div>
              
            </div>
            <div class="contentRight" v-else>
              <div class="conetentItem isActive firstItem">
                <div>{{item.event[0].event}}</div>
                 <div v-if="item.event[0].status == '2'">{{item.event[0].times}}未开始</div>
                  <div v-else-if="item.event[0].status == '1'">{{item.event[0].times}}进行中</div>
                  <div v-else-if="item.event[0].status == '0'"> {{item.event[0].times}}已结束</div>
              </div>
              <div class="contentBottom">
                <div v-if="item.event.length >1" class="conetentItem ">
                  <div>{{item.event[1].event}}</div>
                   <div v-if="item.event[1].status == '2'">{{item.event[1].times}}未开始</div>
                
                  <div v-else-if="item.event[1].status == '1'">{{item.event[1].times}}进行中</div>
                  <div v-else-if="item.event[1].status == '0'"> {{item.event[1].times}}已结束</div>
                </div>
                <div v-if="item.event.length >2" class="imgItem">
                  <img src="../../image/active/line.png" alt=""  >
                </div>
                
                <div v-if="item.event.length >2" class="conetentItem ">
                  <div>{{item.event[2].event}}</div>
                  <div v-if="item.event[2].status == '2'">{{item.event[2].times}}未开始</div>
                  <div v-else-if="item.event[2].status == '1'">{{item.event[2].times}}进行中</div>
                  <div v-else-if="item.event[2].status == '0'"> {{item.event[2].times}}已结束</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getevent} from "api/home/home"
export default {
  data(){
    return {
      
      beforeHide:false,
      afterHide:false,
      dateMessage:"",
      lastTimer:1,
      timer:1,
      isIndex:1,
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
      list:[
        {
          id:1,
          item:"",
          len:0,
          index:0,
          event:[
            {
              id:1,
              event:"",
              status:"1",
              times:"10:00:00"
            }
          ]
        }
      ]
    }
  },
  created(){
    let _date = new Date()
    this.lastTimer = new Date("2018-09-01")/1000
    this.firstTimer = new Date("2018-08-18")/1000
    let _timer = _date.getTime()
    this.timer = Math.ceil(_timer/1000)
    this.setGetEvent()
  },
  methods:{
    setGetEvent(){
      getevent({event_time:this.timer}).then(res=>{
      let _base = res.data.data
      let _arr = []
      _base.forEach(value => {
        let _obj = {}
        _obj = value
        _obj.len = value.event.length
        _obj.index = 0
        if(value.event != "今日无该项赛事"){
          value.event.forEach((element,index)=>{
          let _length = element.event.length
          if(element.status == "1"){
            _obj.index = index + 1
          } 
       
          _obj.event[index].times = element.times.slice(0,element.times.length-3)
         
        })
 
          this.swapArray(_obj.event,_obj.index,0)
          _obj.event =  _obj.event.splice(0,3)
        } else{
          _obj.event = "今日无该项赛事"
        }
        
        _arr.push(_obj)
      });
      this.list = _arr
    })
    },
    exposure(id){
      if(id == 3){
        this.$router.push("nation")
      }else if(id==2) {
        this.$router.push("date")
      }else {
        this.$router.push("active")
      }
    },
    getDate(){
      let _timer = new Date(this.timer*1000)
      this.dateMessage = (_timer.getMonth()+1)+"月"+(_timer.getDate())+"日"
   
    },
    before(){
      this.timer -= 24*3600
      if(this.timer < this.firstTimer){
        this.beforeHide = true
      } else {
        this.beforeHide = false
      }
      if(this.timer>this.lastTimer) {
        this.afterHide = true
      }else {
        this.afterHide = false
      }
       this.setGetEvent()
    },
    after(){
      this.timer += 24*3600 
      if(this.timer < this.firstTimer){
        this.beforeHide = true
      } else {
        this.beforeHide = false
      }
      if(this.timer>this.lastTimer) {
        this.afterHide = true
      }else {
        this.afterHide = false
      }
      this.setGetEvent()
    },
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    }

  },
  computed:{
    comTimer(){
      return this.timer
    }
  },
  watch:{
    comTimer(){
      //console.log(to,form)
      this.getDate()
    }
  },
  components:{
    
  }
}
</script>
<style lang="stylus" scoped>
#active
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
    padding 1.48rem 0 0.2rem 0
    .model
      background-color #2e2924
      position fixed
      top 3.1rem
      width 10.4rem
      left 0.2rem
      height 1.5rem
      .mainHeader
        position absolute
        bottom 0
        display flex
        justify-content space-between
        padding 0 0.3rem
        height 1.2rem
        width 100%
        background-color #362e26
        .before
          min-width 2rem
          height 1.2rem
          line-height @height
          
          img 
            vertical-align middle
            width 0.3rem
            height 0.5rem
          span
            vertical-align middle
            padding-left 0.1rem
            color #7d5224
        .after
          min-width 2rem
          height 1.2rem
          line-height @height
          text-align right
          img 
            vertical-align middle
            width 0.3rem
            height 0.5rem
          span
            vertical-align middle
            padding-left 0.1rem
            color #7d5224
        .titleText
          min-width 3rem
          height 1.2rem
          text-align center
          line-height @height
          font-size 0.36rem
          font-weight bold
    .content
      background-color #cccccc
      .contentBox:nth-of-type(2n+1)
        background-color #43392f
      .contentBox:nth-of-type(2n)
        background-color #3c332a
      .contentBox
        display flex
        justify-content space-between
        .conetntName
          min-width 2.2rem
        .contentRight
          min-width 8rem
          font-size 0.28rem
          .conetentItem
            height 1.6rem
            text-align center
            min-width 4rem
          .isActive
            background url("../../image/active/form.png") no-repeat
            background-size 100% 100%
           
          .contentBottom
            display flex
            justify-content space-between
            .conetentItem
              padding 0.1rem 0
              div
                line-height 0.4rem
                padding 0.1rem 0.1rem 0 0.1rem
                
            .imgItem
              display flex
              align-items center
              
              img
                width 0.02rem 
                height 1.3rem
          .firstItem
            padding 0.2rem 0
            div
              line-height 0.6rem
              color #161310
          .nothing
            height 1.6rem
            line-height 1.6rem
            text-align center
      .contentName
        display flex
        align-items center
        justify-content center  
        width 2.2rem
</style>
