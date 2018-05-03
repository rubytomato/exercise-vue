import Vue from 'vue'
import Vuex from 'vuex'
import CONSTANTS from '@/constants'
import Firebase from 'firebase'
import 'firebase/firestore'
import config from '../config'

const firebaseApp = Firebase.initializeApp(config, 'exercise-vue')
const db = firebaseApp.firestore()
db.settings({ timestampsInSnapshots: true })

// firebase.firestore.Firestore.collection(collectionPath)
// returns firebase.firestore.CollectionReference
const memosRef = db.collection('memos')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    memos: [],
    memo: {}
  },
  mutations: {
    replaceAll (state, payload) {
      state.memos = payload
    },
    replace (state, payload) {
      state.memo = payload
    },
    addOne (state, payload) {
      console.log('-> mutations: addOne')
      state.memo = payload
      console.log('mutations: addOne ->')
    },
    add (state, payload) {
      console.log('-> mutations: add')
      state.memos.push(payload)
      console.log('mutations: add ->')
    },
    update (state, payload) {
      console.log('-> mutations: update')
      const index = state.memos.findIndex(memo => memo.id === payload.id)
      if (index !== -1) {
        state.memos[index] = payload
      }
      console.log('mutations: update ->')
    },
    remove (state, payload) {
      console.log('-> mutations: remove')
      const index = state.memos.findIndex(memo => memo.id === payload.id)
      if (index !== -1) {
        state.memos.splice(index, 1)
      }
      console.log('mutations: remove ->')
    },
    changeMillion (state, payload) {
      const index = state.memos.findIndex(memo => memo.id === payload.id)
      if (index !== -1) {
        state.memos[index].million = payload.million
      }
    },
    changePlatforms (state, payload) {
      const index = state.memos.findIndex(memo => memo.id === payload.id)
      if (index !== -1) {
        state.memos[index].platforms = payload.platforms
      }
    }
  },
  getters: {
    memos (state) {
      console.log('getters: memos')
      return state.memos
    },
    memo (state) {
      console.log('getters: memo')
      return state.memo
    }
  },
  actions: {
    clearMemo ({ commit, state }) {
      commit('replace', CONSTANTS.NEW_EMPTY_MEMO())
    },
    clearMemos ({ commit, state }) {
      commit('replaceAll', [])
    },
    startMemoListener ({ commit, state }, condition) {
      memosRef.doc(condition.id).onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
        console.log(source, ' data: ', doc.data())
        commit('addOne', {
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          platforms: doc.data().platforms,
          million: doc.data().million,
          releasedAt: new Date(doc.data().releasedAt.seconds * 1000)
        })
      })
    },
    startMemosListener ({ commit, state }, condition) {
      console.log('-> actions: start memos listener')
      // where('million', '==', condition.million)
      memosRef.orderBy('releasedAt', 'asc').onSnapshot((querySnapshot) => {
        querySnapshot.docChanges.forEach((change) => {
          console.log('doc change type: ', change.type, change.doc.id)
          console.dir(change.doc.data())
          if (change.type === 'added') {
            console.log('call add: ', change.doc.id)
            commit('add', {
              id: change.doc.id,
              title: change.doc.data().title,
              description: change.doc.data().description,
              platforms: change.doc.data().platforms,
              million: change.doc.data().million,
              releasedAt: new Date(change.doc.data().releasedAt.seconds * 1000)
            })
          } else if (change.type === 'modified') {
            console.log('call update: ', change.doc.id)
            commit('update', {
              id: change.doc.id,
              title: change.doc.data().title,
              description: change.doc.data().description,
              platforms: change.doc.data().platforms,
              million: change.doc.data().million,
              releasedAt: new Date(change.doc.data().releasedAt.seconds * 1000)
            })
          } else if (change.type === 'removed') {
            console.log('call remove: ', change.doc.id)
            commit('remove', { id: change.doc.id })
          }
        })
      },
      (error) => {
        console.error(error.name)
      })
      console.log('actions: start memos listener ->')
    },
    stopMemosListener () {
      console.log('-> actions: stop memos listener')
      const unsubscribeMemos = memosRef.onSnapshot(() => {})
      unsubscribeMemos()
      console.log('actions: stop memos listener ->')
    },
    addMemo ({ commit, state }, payload) {
      console.log('-> actions: addMemo', payload)
      memosRef.add(payload)
        .then((doc) => {
          console.log('Document written with ID: ', doc.id)
        }).catch(function (error) {
          console.error('Error adding document: ', error)
        })
      console.log('actions: addMemo ->')
    },
    deleteMemo ({ commit, state }, payload) {
      console.log('-> actions: deleteMemo', payload)
      const memo = state.memos.find(memo => memo.id === payload.id)
      // TODO not found
      memosRef.doc(memo.id).delete()
        .then(() => {
          console.log('Document successfully deleted!, ', payload.id)
        })
        .catch(err => {
          console.error('Error removing document: ', err)
        })
      console.log('actions: deleteMemo ->')
    },
    updateMillionOfMemo ({ commit, state }, payload) {
      console.log('-> actions: updateMillionOfMemo', payload)
      const memo = state.memos.find(memo => memo.id === payload.id)
      // TODO not found
      const million = !memo.million
      memosRef.doc(memo.id).update({ million: million })
        .then(() => {
          console.log('Document successfully updated!, ', payload.id)
          // Do not mutate vuex store state outside mutation handlers.
          // memo.million = !memo.million
        })
        .catch(err => {
          console.error('Error updating document: ', err)
        })
      console.log('actions: updateMillionOfMemo ->')
    },
    updatePlatformOfMemo ({ commit, state }, payload) {
      console.log('-> actions: updatePlatformOfMemo', payload)
      const memo = state.memos.find(memo => memo.id === payload.id)
      // TODO not found
      const platforms = [].concat(memo.platforms)
      if (platforms.includes(payload.platform)) {
        platforms.splice(platforms.indexOf(payload.platform), 1)
      } else {
        platforms.push(payload.platform)
      }
      console.log('platforms : ', platforms)
      memosRef.doc(memo.id).update({ platforms: platforms })
        .then(() => {
          console.log('Document successfully updated!, ', payload.id)
        }).catch(err => {
          console.error('Error updating document: ', err)
        })
      console.log('actions: updatePlatformOfMemo ->')
    }
  },
  modules: {
    // モジュールの設定
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
