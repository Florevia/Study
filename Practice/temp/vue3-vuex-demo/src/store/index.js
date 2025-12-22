import { createStore } from "vuex";

export default createStore({
  // state可以是一个对象或返回对象的函数，推荐使用函数因为函数返回的是不同的对象，避免状态污染
  state: () => ({
    count: 0,
  }),
  // actions是异步操作，actions中的方法接收一个context参数，context和store实例具有相同的方法和属性
  // context 是一个对象，包含以下属性：
  // - commit: 提交 mutation
  // - dispatch: 分发其他 action
  // - state: 当前模块的 state
  // - getters: 当前模块的 getters
  // - rootState: 根 state（模块化时）
  // - rootGetters: 根 getters（模块化时）

  // payload 是调用时传入的参数
  actions: {
    incrementAsync(context, payload) {
      setTimeout(() => {
        context.commit("increment", payload);
      }, 1000);
    },
  },
  // mutations是同步操作，state参数，当前模块的 state 对象
  mutations: {
    increment(state, payload) {
      state.count += payload;
    },
  },
});
