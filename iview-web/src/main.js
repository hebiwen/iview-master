// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import VueAwesomeSwiper from 'vue-awesome-swiper'

/* import css */
import 'view-design/dist/styles/iview.css'
import 'swiper/css/swiper.css'

import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

Vue.use(ViewUI)
Vue.use(VueAwesomeSwiper)
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  // render:h => h(App)
})
