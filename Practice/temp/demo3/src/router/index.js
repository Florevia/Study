// 引入 Vue Router 库
import {createRouter, createWebHistory} from "vue-router" //引入vue3的路由模块
//vue2的路由模块是 import VueRouter from "vue-router"
// 创建路由实例，参数是一个对象，包含路由配置
const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      name: "home",
      path: "/",
      component: () => import("@/views/home/Home.vue")
      
    }
  ]

})
