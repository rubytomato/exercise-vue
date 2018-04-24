import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MemoList from '@/components/MemoList'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: 'hello world'
      }
    },
    {
      path: '/memo',
      name: 'MemoList',
      component: MemoList,
      meta: {
        title: 'memo linst'
      }
    }
  ]
})

router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
