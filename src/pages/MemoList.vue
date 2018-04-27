<template>
  <div class="memo-list container-fluent">
    <slot name="header" v-bind:title="title" />
    <div class="row justify-content-start">
      <div class="col mb-1">
        <button class="btn btn-danger" v-on:click="titleToggle = !titleToggle">toggle</button>
      </div>
    </div>
    <div class="row justify-content-start">
      <memo-list-card v-for="(memo, index) in memos" v-bind:memo="memo" v-bind:key="index"/>
      <memo-list-form/>
    </div>
    <div class="row">
      <button class="btn-sm btn-dark m-1" v-for="(memo, index) in memos" v-bind:key="index" v-on:click="removeMemo(index)">{{ memo.id }}</button>
    </div>
    <div class="row">
      <button class="btn-sm btn-light m-1" v-for="(memo, index) in memos" v-bind:key="index" v-on:click="toggleDone(index)">{{ memo.id }}</button>
    </div>
    <slot name="footer"/>
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
      title: 'Memo List',
      titleToggle: true
    }
  },
  created () {
    console.log(this.routeInfo)
  },
  // 再描画が起きると常に関数を実行
  // ミューテーションやアクション
  methods: {
    removeMemo (index) {
      this.$store.commit('removeMemo', index)
    },
    toggleDone (index) {
      this.$store.commit('toggleMemo', index)
    },
    addMemo (memo) {
      this.$store.commit('addMemo', memo)
    }
  },
  // computedは結果がキャッシュされる
  // getterには引数は渡せない
  // ステートやゲッター
  computed: {
    memos: {
      get () {
        return this.$store.getters.memos
      },
      set (_memos) {
        // _nothing
      }
    }
  },
  watch: {
    'titleToggle' (n, o) {
      if (n) {
        this.title = this.title.toLowerCase()
      } else {
        this.title = this.title.toUpperCase()
      }
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
