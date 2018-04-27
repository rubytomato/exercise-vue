// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import moment from 'vue-moment'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(moment)
Vue.use(BootstrapVue)

// global mixin
Vue.mixin({
  methods: {
  },
  computed: {
    routeInfo: {
      get () {
        return `${this.$route.name} : ${this.$route.path}`
      },
      set () {
        // nothing
      }
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  'router': router,
  'store': store,
  components: { App },
  template: '<App/>'
})
