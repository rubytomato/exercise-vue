import CONSTANTS from '@/constants'
import firestore from '@/firebase/firestore'
import { MEMO_SET } from '@/store/modules/mutation-types'

// firebase.firestore.Firestore.collection(collectionPath)
// returns firebase.firestore.CollectionReference
const memosRef = firestore.collection('memos')

export default {
  namespaced: true,
  unsubscribe: null,
  state () {
    return {
      data: {}
    }
  },
  mutations: {
    [MEMO_SET] (state, payload) {
      state.data = payload
    }
  },
  getters: {
    data (state) {
      return state.data
    }
  },
  actions: {
    clear ({ commit }) {
      commit(MEMO_SET, CONSTANTS.NEW_EMPTY_MEMO())
    },
    startListener ({ commit }, payload) {
      console.log('start Listener')
      if (this.unsubscribe) {
        console.warn('listener is running. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
      this.unsubscribe = memosRef.doc(payload.id)
        // DocumentSnapshot
        .onSnapshot(docSnapshot => {
          let payload = null
          if (docSnapshot.exists) {
            payload = {
              id: docSnapshot.id,
              title: docSnapshot.data().title,
              description: docSnapshot.data().description,
              platforms: docSnapshot.data().platforms,
              million: docSnapshot.data().million,
              releasedAt: new Date(docSnapshot.data().releasedAt.seconds * 1000)
            }
          }
          commit(MEMO_SET, payload)
        })
    },
    stopListener () {
      console.log('stop Listener')
      if (this.unsubscribe) {
        console.log('listener is stopping. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
    },
    updateMillion ({ state }) {
      const million = !state.data.million
      memosRef.doc(state.data.id).update({ million: million })
        .then(() => {
          // Do not mutate vuex store state outside mutation handlers.
        })
        .catch(err => {
          console.error('Error updating document: ', err)
        })
    },
    updatePlatforms ({ state }, payload) {
      const platforms = [].concat(state.data.platforms)
      if (platforms.includes(payload.platform)) {
        platforms.splice(platforms.indexOf(payload.platform), 1)
      } else {
        platforms.push(payload.platform)
      }
      memosRef.doc(state.data.id).update({ platforms: platforms })
        .then(() => {
          // Do not mutate vuex store state outside mutation handlers.
        })
        .catch(err => {
          console.error('Error updating document: ', err)
        })
    }
  }
}
