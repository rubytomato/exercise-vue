import Vue from 'vue'
import Vuex from 'vuex'
import memo from '@/store/modules/Memo'
import memos from '@/store/modules/Memos'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    memo: memo,
    memos: memos
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
