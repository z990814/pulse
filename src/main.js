import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import axios from './utils/request'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'


Vue.prototype.$axios = axios //全局可以使用axios这个库
Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  store,
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
