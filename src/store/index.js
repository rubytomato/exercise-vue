import Vue from 'vue'
import Vuex from 'vuex'
import memo from '@/store/modules/memo'
import memos from '@/store/modules/memos'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    memo: memo,
    memos: memos
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
