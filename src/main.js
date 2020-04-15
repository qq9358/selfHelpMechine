// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from  'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import "./assets/index.scss"
import "./assets/icon/iconfont.css"

Vue.config.productionTip = false

Vue.use(ElementUI)

import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount("#app")
