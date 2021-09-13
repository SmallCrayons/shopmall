import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//$bus是一个空事件，需要给它赋予值，因为这里需要vue参数的传递，所以赋予new Vue()
//2.给$bus赋值 (3在home.vue 99行左右)
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
