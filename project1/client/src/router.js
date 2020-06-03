import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Register from './views/register.vue'
import Login from './views/Login.vue'
import NOTFOUND from './views/404.vue';
import home from './views/home.vue';
import infoshow from './views/infoshow.vue';
import fundlist from "./views/fundlist.vue";
import entergh from "./views/entergh.vue";
import gkpinfo from "./views/gkpinfo.vue";
import gkpcharge from "./views/gkpcharge";
import chouka from "./views/chouka";
import cangku from "./views/cangku";
import gonghuizhan from "./views/gonghuizhan";

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {path:'',component:home},
        {path:'/home',name:'home',component:home},
        {path:'/infoshow',name:'infoshow',component:infoshow},
        {path:'/fundlist',name:'fundlist',component:fundlist},
        {path:'/entergh',name:'entergh',component:entergh},
        {path:'/gkpinfo',name:'gkpinfo',component:gkpinfo},
        {path:'/gkpcharge',name:'gkpcharge',component:gkpcharge},
        {path:'/chouka',name:'chouka',component:chouka},
        {path:'/cangku',name:'cangku',component:cangku},
        {path:'/gonghuizhan',name:'gonghuizhan',component:gonghuizhan}
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: NOTFOUND
    }
  ]
})
//router gouzi
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.eleToken?true:false;
  if(to.path=='/login'||to.path=='/register'){
    next();
  }else{
    isLogin?next():next('/login');
  }
})
export default router;