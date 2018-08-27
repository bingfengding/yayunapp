<template>
  <div id="team">
    <header-top v-if="isShow"></header-top>
    <div class="header" v-else>
      <header>
      <div class="return">
        <div class="linkBox"  @click="goreturn"> 
          <img src="../image/up.png" alt="">    
        </div>
        
      </div>
      <div class="headerText">{{message}}</div>
    </header>
    </div>
    <div class="main">
      <ul v-if="isShow">
        <li v-for="(item,index) in list" :key="index">
          <ul>
            <li v-for="value in item[0].groupitem" :key="value.country_id" class="itemBox">
              <div class="groupNum groupItem">
                <div class="groupNumBg">0{{index+1}}</div>
              </div>
              <div class="grounpImg groupItem"><img :src="domain+item[0].groupitem_image" alt=""></div>
              <div class="countryImg groupItem"><img :src="domain+value.country_image" alt=""></div>
              <div class="countryCn groupItem">{{value.team_name}}</div>
              <div class="player groupItem" @click="gotoPlayer(item[0].group_id,value.country_id,index)"></div>
            </li>
          </ul>
        </li>
      </ul>
      <div class="teamInfo" v-else>
        
        <swiper 
        class="swiper-container1 scheduleSwiper1" 
        id="scheduleSwiper1"
        :options="swiperOption1"
        ref="mySwiper1" 
       >
          <!-- <div class="swiper-wrapper swiper-wrapper2"> -->
          <swiper-slide class="swiper-slide swiper-slide1" v-for="(item,index) in items.memberList" :key="index">
            <div class="infoHeader" >
            <div class="infoLeft" :style="'backgroundImage:url('+ domain + item.member_image +')'">
              <div class="flag">
                <img :src="domain+items.agCountry[0].image" alt="">
                <div class="reamNum">
                  0{{isTeamItem}}
                </div>
              </div>
            
            </div>
            <div class="infoRight">
              <div class="infoRightHeader">
                <img :src="domain + items.agEsportsCategory[0].cate_image" alt="">
                <p>{{items.agEsportsCategory[0].cate_name}}</p>
              </div>
              <div class="infoContent">
                <p class="firstInfo">{{item.member_name}}</p>
                <p>专业特长：{{item.member_professional}}</p>
                <p>所属运动队：{{item.team_name}}</p>
                <p>战队内位置：{{item.member_tposition}}</p>
                <div class="infoContents">
                  <div>
                    <p>主要成就：</p>
                    <div v-for="(type,key) in item.contents" :key="key" >
                      {{type}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </swiper-slide>
          <!-- </div> -->
        </swiper>
        <div class="pagination1" ref="pagination1">
          <ul>
            <li v-for="(item,index) in items.memberList" :key="index" class="liItem" :class="isActive ===index ? 'isActive' :''">
              <div class="liFlex">
                <div class="liItemBox">
                  <div class="headerImgBox" @click="switchBtn(index)"> 
                    <img :src="domain+item.headimage" alt="">
                  </div>
                  <div class="textCen">{{item.abbrname}}</div>
                </div>
              </div>
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import headerTop from "@/components/header"
import {getesportsteam,getesportsmember} from "api/home/home"
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data(){
    return {
      isTeamItem:1,
      isActive:0,
      isShow:true,
      domain:"",
      message:"战队介绍",
      swiperOption1:{
        on: { 
        slideChangeTransitionEnd: ()=>{
    
          this.isActive = this.swiper1.activeIndex;//切换结束时，告诉我现在是第几个slide
       
        },
      },
      },
      list:[
        [{
          domain:"",
          group:"",
          group_id:1,
          groupitem_image:"",
          groupitem:[
            {
              country_id:1,
              country_image:"",
              country_name:"",
              team_name:"",
              team_id:""
            }
          ]
        }]
      ],
      items:{
        agCountry:[{
          cn:"",
          image:""
        }],
        agEsportsCategory:[{
          cate_image:"",
          cate_name:""
        }],
        memberList:[
          {
            abbrname:"",
            contents:[""],
            headimage:"",
            member_image:"",
            member_name:"",
            member_professional:"",
            member_tposition:"",
            team_name:""
          }
        ]
      }
    }
  },
  created(){
    console.log(this)
    getesportsteam().then(res=>{
      let _base = res.data.data
      this.domain = _base[0][0].domain
      this.list = _base
    
    })
  },
  mounted(){
    
  },
  methods:{
    gotoPlayer(index,key,value){
      this.isTeamItem = value+1
      this.isShow = false
      getesportsmember({group_id:index,country_id:key}).then(
        res=>{
          let _base = res.data.data
          this.items = _base
          console.log(this.items)
          this.$nextTick(()=>{
            console.log(this.$refs.pagination1)
          })
        }
      )
    },
    goreturn(){
      this.isShow = true
    },
    switchBtn(index){
      this.isActive =index
      this.swiper1.slideTo(index);
    }
  },
  computed:{
    swiper1() {
      return this.$refs.mySwiper1.swiper
      },
  },

  components:{
    headerTop
  }
}
</script>
<style lang="stylus" scoped>
#team
  padding 1.95rem 0.2rem 0.2rem 0.2rem
  font-size 0.32rem
  .main
    .itemBox
      height 1.6rem
      margin 0.1rem 0
      background-color #362e26
      padding 0 1.3rem 0 0.3rem
      display flex
      justify-content space-between
      position relative
      .groupNum
        width 1.2rem
        font-size 0.36rem
        .groupNumBg
          width 0.9rem
          height 1.6rem
          background url("../image/team/formbg.png") no-repeat
          background-size 0.9rem 1.1rem
          background-position center 0.3rem
          line-height 1.5rem
          text-align center
          font-weight bold
      .grounpImg
        width 2rem
        display flex
        justify-content center
        align-items center
        img
          max-width 2rem
      .countryImg
        width 1.2rem
        display flex
        justify-content center
        align-items center
        img 
          width 0.9rem
          height 0.9rem
      .countryCn
        width 2rem
        display flex
        justify-content center
        align-items center
        text-align center
      .player
        width 0.6rem
        position absolute
        right 0.1rem
        background url("../image/team/arrow.png") no-repeat
        background-size 0.3rem 0.6rem
        background-position center right 
      .groupItem
        height 1.6rem
    .teamInfo
      background-color #362e26
      min-height 10rem
      padding 0.1rem 0.3rem
      .scheduleSwiper1
        .swiper-slide1
          .infoHeader
            display flex
            justify-content space-between
            height 9rem
            
            .infoLeft
              width 50%
              background-repeat no-repeat
              background-position bottom center
              background-size auto 7.25rem
              .flag
                width 1.3rem
                height 3.5rem
                background url("../image/team/flag.png") no-repeat
                background-size 100% 100%
                display flex
                justify-content center
                align-items center
                position relative
                >img
                  width 0.9rem
                  height 0.9rem
                .reamNum
                  position absolute
                  width 0.62rem
                  height 0.77rem
                  top 0.2rem
                  left 50%
                  transform translateX(-50%)
                  background-color #cccccc
                  background url("../image/team/formbg.png") no-repeat
                  background-size 100% 100%
                  text-align center
                  line-height 0.7rem
            .infoRight
              width 50%
              padding-top 0.2rem
              .infoRightHeader
                display flex
                justify-content flex-start
                img
                  width 2rem
                  height 1rem
                p
                  max-width 3.2rem
                  height 1rem
                  display flex
                  align-items center
              .infoContent
                margin-top 1.6rem
                .firstInfo
                  font-size 0.4rem
                  font-weight bold
                  margin-bottom 0.3rem
      .pagination1
        padding-bottom 1rem
        padding-top 1rem
        ul
          width 100%
          .liItem.isActive
            .headerImgBox
              border 1px solid #ffffff !important
          .liItem
            width 1.96rem
            display inline-block
            padding-bottom 0.7rem
            .liFlex
              display flex
              justify-content center
              .liItemBox
                width 1.36rem
                .headerImgBox
                  width 1.36rem
                  height 1.36rem
                  border-radius 50%
                  border 1px solid transparent
                  //background-color transparent
                  display flex
                  justify-content center
                  align-items center
                  margin-bottom 0.2rem
                  img
                    width 100%
                    height @width         
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
