// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'



Vue.config.productionTip = false;


Vue.use(VueBaiduMap.default, {
  ak: 've0tgnaZ0WoxEH8Rk2NDwswGqhUrVNPj'
})
Vue.use(ELEMENT);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
