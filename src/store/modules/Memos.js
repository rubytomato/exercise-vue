import firestore from '@/firebase/firestore'

// firebase.firestore.Firestore.collection(collectionPath)
// returns firebase.firestore.CollectionReference
const memosRef = firestore.collection('memos')

export default {
  namespaced: true,
  unsubscribe: null,
  state () {
    return {
      data: []
    }
  },
  mutations: {
    init (state, payload) {
      state.data = payload
    },
    add (state, payload) {
      state.data.push(payload)
      state.data.sort((a, b) => {
        return a.releasedAt.getTime() - b.releasedAt.getTime()
      })
    },
    set (state, payload) {
      const index = state.data.findIndex(memo => memo.id === payload.id)
      if (index !== -1) {
        state.data[index] = payload
      }
    },
    remove (state, payload) {
      const index = state.data.findIndex(memo => memo.id === payload.id)
      if (index !== -1) {
        state.data.splice(index, 1)
      }
    }
  },
  getters: {
    data (state) {
      return state.data
    }
  },
  actions: {
    clear ({ commit }) {
      commit('init', [])
    },
    startListener ({ commit }) {
      console.log('start listener')
      if (this.unsubscribe) {
        console.warn('listener is running. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
      this.unsubscribe = memosRef.orderBy('releasedAt', 'asc')
        // QuerySnapshot
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges.forEach(change => {
            const payload = {
              id: change.doc.id,
              title: change.doc.data().title,
              description: change.doc.data().description,
              platforms: change.doc.data().platforms,
              million: change.doc.data().million,
              releasedAt: new Date(change.doc.data().releasedAt.seconds * 1000)
            }
            if (change.type === 'added') {
              commit('add', payload)
            } else if (change.type === 'modified') {
              commit('set', payload)
            } else if (change.type === 'removed') {
              commit('remove', payload)
            }
          })
        },
        (error) => {
          console.error(error.name)
        })
    },
    stopListener () {
      console.log('stop listener')
      if (this.unsubscribe) {
        console.log('listener is stopping. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
    },
    addMemo ({ commit }, payload) {
      memosRef.add(payload)
        .then(doc => {
          // Do not mutate vuex store state outside mutation handlers.
        })
        .catch(err => {
          console.error('Error adding document: ', err)
        })
    },
    deleteMemo ({ commit }, payload) {
      memosRef.doc(payload.id).delete()
        .then(() => {
          // Do not mutate vuex store state outside mutation handlers.
        })
        .catch(err => {
          console.error('Error removing document: ', err)
        })
    }
  }
}
