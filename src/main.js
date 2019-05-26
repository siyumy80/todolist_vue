import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import api from './store/api/api'
import store from './store'
Vue.use(Vuetify);
Vue.prototype.$EventBus = new Vue();
Vue.prototype.$api = api;
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
