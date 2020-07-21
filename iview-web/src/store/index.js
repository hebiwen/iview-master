import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

Vue.use(Vuex);

// 常规做法
// export default new Vuex.Store({
//     state:state => {import state from './modules/app'},
//     mutations,
//     actions
// })

const store = new Vuex.Store({
    store:{},
    state:{},
    mutations:{}, // 同步修改store.state
    actions:{}, // 异步 1:action中不能直接更改状态，它是通过提交mutation来实现操作 2:action的调用使用 $.store.dispatch
    modules:{ app }
})

export default store;


