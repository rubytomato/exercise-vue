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
    // memos: [
    //   { id: 1, title: 'ゼルダの伝説', description: '『ゼルダの伝説』（ゼルダのでんせつ、The Legend of Zelda）は、任天堂から発売されたゲームソフト。ゼルダの伝説シリーズの一作目にあたる。表記はパッケージやタイトル画面では『THE HYRULE FANTASY ゼルダの伝説』となっている。日本では昭和61年2月21日にファミリーコンピュータ ディスクシステム用として、日本国外のディスクシステムが発売されなかった地域ではロムカセットとして発売された。', platforms: ['FC'], million: true, releasedAt: new Date('1986-02-21') },
    //   { id: 2, title: 'リンクの冒険', description: '『リンクの冒険』（リンクのぼうけん、英題: Zelda II: The Adventure of Link）は、任天堂より昭和62年1月14日に発売されたファミリーコンピュータ ディスクシステム用アクションアドベンチャーゲーム。パッケージおよびタイトル画面では『THE LEGEND OF ZELDA 2 リンクの冒険』と表記され、テレビCMでは『ゼルダの伝説パート2 リンクの冒険』と紹介している。', platforms: ['FC'], million: true, releasedAt: new Date('1987-01-14') },
    //   { id: 3, title: 'ゼルダの伝説 神々のトライフォース', description: '『ゼルダの伝説 神々のトライフォース』（ゼルダのでんせつ かみがみのトライフォース）は、平成3年11月21日に任天堂から発売されたスーパーファミコン用ゲームソフト。ジャンルはアクションアドベンチャーゲーム。', platforms: ['SFC'], million: true, releasedAt: new Date('1991-11-21') },
    //   { id: 4, title: 'ゼルダの伝説 夢をみる島', description: '『ゼルダの伝説 夢をみる島』（ゼルダのでんせつ ゆめをみるしま、英題: The Legend of Zelda: Link\'s Awakening）は、任天堂から平成5年6月6日に発売されたゲームボーイ用アクションアドベンチャーゲーム。', platforms: ['GB'], million: false, releasedAt: new Date('1993-06-06') },
    //   { id: 5, title: 'ゼルダの伝説 時のオカリナ', description: '『ゼルダの伝説 時のオカリナ』（ゼルダのでんせつ ときのオカリナ、英題：The Legend of Zelda: Ocarina of Time）は、平成9年11月21日に任天堂より発売されたNINTENDO64（N64）用アクションアドベンチャーゲーム、アクションRPG。', platforms: ['64'], million: true, releasedAt: new Date('1998-11-21') },
    //   { id: 6, title: 'ゼルダの伝説 ムジュラの仮面', description: '『ゼルダの伝説 ムジュラの仮面』（ゼルダのでんせつ ムジュラのかめん、英題:The Legend of Zelda: Majora\'s Mask）は、任天堂より平成12年4月27日に発売されたNINTENDO64用3DアクションRPG。『ゼルダの伝説 時のオカリナ』の続編。', platforms: ['64'], million: false, releasedAt: new Date('2000-04-27') },
    //   { id: 7, title: 'ゼルダの伝説 ふしぎの木の実', description: '『ゼルダの伝説 ふしぎの木の実』（ゼルダのでんせつ ふしぎのきのみ）は、平成13年2月27日に任天堂から発売されたゲームボーイカラー用アクションアドベンチャーゲーム2作品の総称。『ゼルダの伝説 ふしぎの木の実 大地の章』（―だいちのしょう、英題:The Legend of Zelda: Oracle of Seasons）と『ゼルダの伝説 ふしぎの木の実 時空の章』（―じくうのしょう、英題:The Legend of Zelda: Oracle of Ages）が同時発売された。略称は「木の実」など。', platforms: ['GB'], million: false, releasedAt: new Date('2001-02-27') },
    //   { id: 8, title: 'ゼルダの伝説 風のタクト', description: '『ゼルダの伝説 風のタクト』（ゼルダのでんせつ かぜのタクト、英: The Legend of Zelda: The Wind Waker）は、平成14年12月13日に任天堂より発売されたニンテンドーゲームキューブ用アクションアドベンチャーゲームである。', platforms: ['GC'], million: false, releasedAt: new Date('2002-12-13') },
    //   { id: 9, title: 'もぎたてチンクルのばら色ルッピーランド', description: '『もぎたてチンクルのばら色ルッピーランド』（もぎたてチンクルのばらいろルッピーランド、Freshly-Picked Tingle\'s Rosy Rupeeland）は、平成18年9月2日に任天堂より発売されたニンテンドーDS用ソフト。', platforms: ['DS'], million: false, releasedAt: new Date('2006-09-02') },
    //   { id: 10, title: 'ゼルダの伝説 トワイライトプリンセス', description: '『ゼルダの伝説 トワイライトプリンセス』（ゼルダのでんせつ トワイライトプリンセス、英題:The Legend of Zelda: Twilight Princess）は、任天堂より発売された、Wii・ニンテンドーゲームキューブ用のアクションアドベンチャーゲーム。略称は「トワプリ」。', platforms: ['GC', 'Wii'], million: false, releasedAt: new Date('2006-12-02') },
    //   { id: 11, title: 'ゼルダの伝説 夢幻の砂時計', description: '『ゼルダの伝説 夢幻の砂時計』（ゼルダのでんせつ むげんのすなどけい、英題:The Legend of Zelda: Phantom Hourglass）は、任天堂開発・発売のニンテンドーDS専用ゲームソフト。略称は「夢砂」「夢幻」など。', platforms: ['DS'], million: false, releasedAt: new Date('2007-06-23') },
    //   { id: 12, title: 'ゼルダの伝説 大地の汽笛', description: '『ゼルダの伝説 大地の汽笛』（ゼルダのでんせつ だいちのきてき、英題:The Legend of Zelda: Spirit Tracks）は、任天堂から平成20年12月23日に発売されたニンテンドーDS用アクションアドベンチャーゲーム。略称は「汽笛」など。', platforms: ['DS'], million: false, releasedAt: new Date('2009-12-07') },
    //   { id: 13, title: 'ゼルダの伝説 スカイウォードソード', description: '『ゼルダの伝説 スカイウォードソード』（ゼルダのでんせつ スカイウォードソード、英題：The Legend of Zelda: Skyward Sword）は、任天堂より平成22年11月23日に発売されたWii用アクションアドベンチャーゲーム。2016年9月2日からはWii U用ダウンロードソフトとして配信されている。', platforms: ['Wii', 'Wii U'], million: false, releasedAt: new Date('2011-11-23') },
    //   { id: 14, title: 'ゼルダの伝説 神々のトライフォース2', description: '『ゼルダの伝説 神々のトライフォース2』（ゼルダのでんせつ かみがみのトライフォースツー、英題：The Legend of Zelda: A Link Between Worlds）は、平成25年12月26日に任天堂から発売されたニンテンドー3DS用アクションアドベンチャーゲーム。', platforms: ['3DS'], million: false, releasedAt: new Date('2013-12-26') },
    //   { id: 15, title: 'ゼルダの伝説 ブレス オブ ザ ワイルド', description: '『ゼルダの伝説 ブレス オブ ザ ワイルド』（ゼルダのでんせつ ブレス オブ ザ ワイルド、英題:The Legend of Zelda: Breath of the Wild）は、任天堂より平成29年3月3日に発売されたWii UおよびNintendo Switch用アクションアドベンチャーゲーム。', platforms: ['Wii U', 'Switch'], million: true, releasedAt: new Date('2017-03-03') }
    // ],
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
    // allMemo ({ commit, state }) {
    //   console.log('-> actions: allMemo')
    //   // firebase.firestore.CollectionReference.get()
    //   // returns firebase.firestore.QuerySnapshot
    //   // > A promise that will be resolved with the results of the query.
    //   memosRef.where('million', '==', true).orderBy('releasedAt', 'asc').get()
    //     .then((querySnapshot) => {
    //       var temp = []
    //       querySnapshot.forEach((doc) => {
    //         console.log(doc.id, doc.data())
    //         temp.push({
    //           id: doc.id,
    //           title: doc.data().title,
    //           description: doc.data().description,
    //           platforms: doc.data().platforms,
    //           million: doc.data().million,
    //           releasedAt: new Date(doc.data().releasedAt.seconds * 1000)
    //         })
    //       })
    //       commit('replaceAll', temp)
    //     }).catch(err => {
    //       console.log('Error', err)
    //     })
    //   console.log('actions: allMemo ->')
    // },
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
