// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyLoad from 'vue-lazyload'

/* import css */
import 'view-design/dist/styles/iview.css'
import 'swiper/css/swiper.css'

import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

Vue.use(ViewUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad,{ perLoad:1.3,error:'dist/error.png',loading:'dist/loading.gif', attempt:1 })

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.baseURL = process.env.API_ROOT;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,   // 相当于store:store,注册后子组件可以使用this.$store访问
  components: { App },
  template: '<App/>'
  // render:h => h(App)
})
