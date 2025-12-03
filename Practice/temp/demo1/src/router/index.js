//安装依赖
import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Gang from "../components/Gang.vue";

Vue.use(Router);

// 路由配置
// 定义路由规则
// 路由表
export default new Router({
  routes: [
    {
      path: "/",
      component: Gang,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
  ],
});
