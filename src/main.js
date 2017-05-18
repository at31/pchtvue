// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import store from './vuex/store' // vuex store instance 
import router from './router' // vue-router instance 

sync(store, router)

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-default/index.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon' // font awesome

Vue.use(ElementUI,{ locale })

Vue.config.productionTip = false
Vue.component('icon', Icon)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  
  store,
  template: '<app/>',
  components: { App },
  
   //render: h => h(App)
})
