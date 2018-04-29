<template>
  <div class="memo-list container-fluent">
    <!-- <slot name="header" v-bind:title="title" /> -->
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
        v-on:click="removeMemo(memo.id)">
        {{ memo.id }}
      </button>
    </div>
    <div class="row">
      <button class="btn-sm btn-light m-1"
        v-for="(memo, index) in memos"
        v-bind:key="index"
        v-on:click="toggleMillion(memo.id)">
        {{ memo.id }}
      </button>
    </div>
    <!-- <slot name="footer"/> -->
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
      // title: 'Memo List'
    }
  },
  created () {
    console.log(this.routeInfo)
  },
  // 再描画が起きると常に関数を実行
  // ミューテーションやアクション
  methods: {
    addMemo (_memo) {
      // 第2引数はpalyload
      this.$store.commit('addMemo', _memo)
    },
    removeMemo (_id) {
      this.$store.commit('removeMemo', {id: parseInt(_id, 10)})
    },
    toggleMillion (_id) {
      this.$store.commit('toggleMillion', {id: parseInt(_id, 10)})
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
