import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/helloworld",
      component: () => import("@/components/HelloWorld.vue"),
    },
    {
      path: "/hellopeople",
      component: () => import("@/components/HelloPeople.vue"),
    },
  ],
});
