import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: '初期メッセージ',
    memos: [
      { id: 1, title: 'Card title that wraps to a new line', description: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', done: true, updateAt: new Date('2018-04-23 17:11:03') },
      { id: 2, title: 'Someone famous in Source Title', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.', done: false, updateAt: new Date('2018-04-23 19:17:37') },
      { id: 3, title: 'Card title', description: 'This card has supporting text below as a natural lead-in to additional content.', done: false, updateAt: new Date('2018-04-24 22:35:43') },
      { id: 4, title: 'memo4', description: 'desc4', done: false, updateAt: new Date('2018-04-25 09:10:12') },
      { id: 5, title: 'memo5', description: 'desc5', done: false, updateAt: new Date('2018-04-26 11:26:31') },
      { id: 6, title: 'memo6', description: 'desc6', done: false, updateAt: new Date('2018-04-26 12:47:01') },
      { id: 7, title: 'memo7', description: 'desc7', done: true, updateAt: new Date('2018-04-27 15:57:14') },
      { id: 8, title: 'memo8', description: 'desc8', done: true, updateAt: new Date('2018-04-27 16:13:27') },
      { id: 9, title: 'memo9', description: 'desc9', done: true, updateAt: new Date('2018-04-27 21:01:44') }
    ],
    nextId: 10
  },
  mutations: {
    setMessage (state, _payload) {
      state.message = _payload
    },
    addMemo (state, _memo) {
      _memo.id = state.nextId
      _memo.done = false
      _memo.updateAt = new Date()
      state.memos.push(_memo)
      state.nextId++
    },
    removeMemo (state, _index) {
      state.memos.splice(_index, 1)
    },
    toggleMemo (state, _index) {
      state.memos[_index].done = !state.memos[_index].done
    }
  },
  actions: {
    getMessage (commit) {
      commit('setMessage', 'test')
    }
  },
  getters: {
    message (state) {
      return state.message
    },
    memos (state) {
      return state.memos
    },
    memo (state) {
      return function (id) {
        for (let i in state.memos) {
          if (state.memos[i].id === id) {
            return state.memos[i]
          }
        }
        return {}
      }
    }
  }
})

export default store
