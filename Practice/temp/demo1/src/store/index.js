//安装依赖

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "张三",
    firstName: "王",
    lastName: "老五",
  },
  getters: {
    fullName(state) {
      return 1;
      console.log(state)
    }
  }
});
