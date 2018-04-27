<template>
  <div class="memo-list container-fluent">
    <slot name="header" v-bind:title="title" />
    <div class="row justify-content-start">
      <div class="col mb-1">
        <button class="btn btn-danger" v-on:click="titleToggle = !titleToggle">toggle</button>
      </div>
    </div>
    <div class="row justify-content-start">
      <memo-list-card v-for="(memo, index) in memos" v-bind:memo="memo" :key="index"/>
      <memo-list-form v-bind:nextId="nextId" v-on:addMemo="addMemo"/>
    </div>
    <div class="row">
      <button class="btn-sm btn-dark m-1" v-for="(memo, index) in memos" :key="index" v-on:click="removeMemo(index)">{{ memo.id }}</button>
    </div>
    <div class="row">
      <button class="btn-sm btn-light m-1" v-for="(memo, index) in memos" :key="index" v-on:click="toggleDone(index)">{{ memo.id }}</button>
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
      titleToggle: true,
      memos: [],
      nextId: 8
    }
  },
  created () {
    console.log(this.getRouteInfo())
    this.memos = [
      { id: 1, title: 'Card title that wraps to a new line', description: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', done: true, updateAt: new Date() },
      { id: 2, title: 'Someone famous in Source Title', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.', done: false, updateAt: new Date() },
      { id: 3, title: 'Card title', description: 'This card has supporting text below as a natural lead-in to additional content.', done: false, updateAt: new Date() },
      { id: 4, title: 'memo4', description: 'desc4', done: false, updateAt: new Date() },
      { id: 5, title: 'memo5', description: 'desc5', done: false, updateAt: new Date() },
      { id: 6, title: 'memo6', description: 'desc6', done: false, updateAt: new Date() },
      { id: 7, title: 'memo7', description: 'desc7', done: false, updateAt: new Date() }
    ]
  },
  methods: {
    removeMemo (index) {
      this.memos.splice(index, 1)
    },
    toggleDone (index) {
      this.memos[index].done = !this.memos[index].done
    },
    addMemo (memo) {
      this.memos.push(memo)
      this.nextId++
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
