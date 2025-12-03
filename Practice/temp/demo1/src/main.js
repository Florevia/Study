import Vue from "vue"; 
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js"

Vue.config.productionTip = false


new Vue({
  render: function (h) { return h(App) },
  router: router,
  store: store,
}).$mount('#app')
