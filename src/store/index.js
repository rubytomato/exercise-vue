import Vue from 'vue'
import Vuex from 'vuex'
import memos from '@/store/modules/memos'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    memos: memos
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
