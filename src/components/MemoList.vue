<template>
  <div class="memo card">
    <div class="card-header">
      <h1 class="card-title">{{ title }}</h1>
    </div>
    <div class="card-body">
      <b-table striped hover :items="memos" :fields="fields" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoList',
  data () {
    return {
      title: 'Memo List',
      fields: ['id', 'title', 'description', 'done'],
      memos: []
    }
  },
  created: function () {
    console.log('created!')
    this.memos = [
      { id: 1, title: 'memo1', description: 'desc1', done: true },
      { id: 2, title: 'memo2', description: 'desc2', done: false },
      { id: 3, title: 'memo3', description: 'desc3', done: false },
      { id: 4, title: 'memo4', description: 'desc4', done: false }
    ]
  }
}
</script>

<style scoped>
</style>
