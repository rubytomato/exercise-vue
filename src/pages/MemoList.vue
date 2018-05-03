<template>
  <div class="memo-list container-fluent">
    <div class="row justify-content-start">
      <memo-list-card
        v-for="(memo, index) in memos"
        v-bind:key="index"
        v-bind:memo="memo"/>
      <memo-list-form/>
    </div>
    <div class="row">
      <button class="btn-sm btn-dark m-1"
        v-for="(memo, index) in memos"
        v-bind:key="index"
        v-on:click="remove(memo.id)">
        {{ index }}
      </button>
    </div>
    <div class="row">
      <button class="btn-sm btn-light m-1"
        v-for="(memo, index) in memos"
        v-bind:key="index"
        v-on:click="updateMillion(memo.id)">
        {{ index }}
      </button>
    </div>
  </div>
</template>

<script>
import MemoListCard from '@/components/MemoListCard'
import MemoListForm from '@/components/MemoListForm'

export default {
  name: 'MemoList',
  components: {
    'memo-list-card': MemoListCard,
    'memo-list-form': MemoListForm
  },
  data () {
    return {
    }
  },
  created () {
    console.log('created!!', this.routeInfo)
  },
  mounted () {
    console.log('mounted !!')
    this.init()
    this.start()
  },
  destroyed () {
    console.log('destroyed !!')
    this.stop()
  },
  // 再描画が起きると常に関数を実行
  // ミューテーションやアクション
  methods: {
    init () {
      this.$store.dispatch('clearMemos')
    },
    start () {
      this.$store.dispatch('startMemosListener', { million: true })
    },
    stop () {
      this.$store.dispatch('stopMemosListener')
    },
    search () {
      console.log('メモを検索する')
    },
    remove (id) {
      this.$store.dispatch('deleteMemo', { id })
    },
    updateMillion (id) {
      this.$store.dispatch('updateMillionOfMemo', { id })
    }
  },
  // computedは結果がキャッシュされる
  // getterには引数は渡せない
  // ゲッター
  computed: {
    memos () {
      return this.$store.getters.memos
    }
  }
}
</script>

<style scoped>
.memo-list {
  text-align: center;
}
.row {
  margin-left: 0%;
}
</style>
