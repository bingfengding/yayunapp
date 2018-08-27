import Vue from "vue";
import Router from "vue-router";
const home = r =>
  require.ensure([], () => r(require("view/home.vue")), "home");
  const list = r =>
  require.ensure([], () => r(require("view/list/list.vue")), "list");
  const active = r =>
  require.ensure([], () => r(require("view/list/active.vue")), "list");
  const date = r =>
  require.ensure([], () => r(require("view/list/date.vue")), "list");
  const fast = r =>
  require.ensure([], () => r(require("view/fast.vue")), "fast");
  const medal = r =>
  require.ensure([], () => r(require("view/medal.vue")), "medal");
  const movie = r =>
  require.ensure([], () => r(require("view/movie.vue")), "movie");
  const nation = r =>
  require.ensure([], () => r(require("view/list/nation.vue")), "list");
  const news = r =>
  require.ensure([], () => r(require("view/news.vue")), "news");
  const sale = r =>
  require.ensure([], () => r(require("view/sale.vue")), "sale");
  const team = r =>
  require.ensure([], () => r(require("view/team.vue")), "team");
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    //跳转主页面
    {
      path: "/home",
      component: home
    },
    //跳转赛程安排
    {
      path: "/list",
      component: list,
      name:"赛程安排",
      children:[
        //跳转今日赛程
        {
          path: "",
          redirect: "/list/date",
          name:"赛程安排"
        },
        {
          path: "/list/active",
          component: active,
          name:"赛程安排"
        },
        //跳转赛程安排
        {
          path: "/list/date",
          component: date,
          name:"赛程安排"
        },
        //跳转参赛国家
        {
          path: "/list/nation",
          component: nation,
          name:"赛程安排"
        },
      ]
    },
    
    //跳转快速投注
    {
      path: "/fast",
      component: fast,
      name:"快速投注"
    },
    //跳转奖牌排行
    {
      path: "/medal",
      component: medal,
      name:"奖牌排行"
    },
    //跳转电竞团队
    {
      path: "/team",
      component: team,
      name:"电竞团队"
    },
    //跳转精彩时刻
    {
      path: "/movie",
      component: movie,
      name:"精彩时刻"
    },
    //跳转优惠活动
    {
      path: "/sale",
      component: sale,
      name:"优惠活动"
    },
    //跳转赛事新闻
    {
      path: "/news",
      component: news,
      name:"赛事新闻"
    }
  ]
});
