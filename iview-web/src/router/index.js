import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const loginRouter = {
  path:'/login',
  name:'login',
  component: () => import('@/views/Account/login') 
}

export const loginAndRegisterRouter = [
  {
    path:'/login',
    name:'登录',
    component: () => import('@/views/Account/login') 
  },
  {
    path:'/register',
      name:'注册',
      component:() => import('@/views/Account/register') 
  }
]
  
export const mainRouter = {
      path: '/',
      name: 'mainRouter',
      redirect:'/index', // 默认指向首页
      component:() => import('@/views/main.vue'),
      children:[
        { path:'index',title:'首页',name:'index',component: () => import('@/views/Home/index') },
        { path:'category',title:'分类',name:'category',component: () => import('@/views/Category/category') },
        { path:'shop',title:'书城',name:'shop',component: () => import('@/views/Shop/shopIndex') },
        { path:'cart',title:'购物车',name:'cart',component: () => import('@/views/Cart/cart') },
        { path:'my',title:'我的',name:'my',component: () => import('@/views/My/userInfo') }
      ]
}


export const appRouter = {
  path:'/index',
  name:'childRoute',
  title:'二级路由',
  component:() => import('@/views/main.vue'),
  children:[
    { path:'/index/report',title:'报告详情',name:'report',component:() => import('@/views/Report/report') },
    { path:'/shop/goods',title:'商品详情',name:'goods',component:() => import('@/views/Shop/goods') },
  ]
}

export default new Router({
  mode:'history',
  routes: [
    ...loginAndRegisterRouter, // 路由数组
    mainRouter,
    appRouter,
  ]
})
