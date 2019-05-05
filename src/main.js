import Vue from 'vue'
import App from './App.vue'
//import VueRouter from 'vue-router'
//import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale });
Vue.prototype.$EventBus = new Vue();
//Vue.use(VueRouter)
Vue.config.productionTip = false
//const router = new VueRouter({mode: 'history',routes});
new Vue({
  render: h => h(App),
  
}).$mount('#app')
