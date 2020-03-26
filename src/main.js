import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'

Vue.use(BootstrapVue)

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

Vue.prototype.$axios = axios.create({
  baseURL: 'http://51.91.8.97:18180'
})

new Vue({
  router,
  store,
  render: h => h(App),
  methods:{
    makeToast(errorMsg) {
      this.$root.$bvToast.toast(errorMsg, {
        title: "⚠ Erreur !",
        variant: "danger",
        noCloseButton: true
      })
    }
  },
}).$mount('#app')
