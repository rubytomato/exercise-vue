<template>
  <div class="card mb-2 float-lg-left" style="width: 20rem;">
    <div class="card-header text-left">
      <input v-model.trim="memo.title" type="text" class="form-control" placeholder="title">
    </div>
    <div class="card-body text-left">
      <textarea v-model.trim="memo.description" class="form-control" placeholder="description"/>
    </div>
    <div class="card-footer text-right">
      <button class="btn-sm btn-secondary" type="submit" @click.prevent="addMemo">add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoListForm',
  data () {
    return {
      memo: this.emptyMemo()
    }
  },
  methods: {
    addMemo () {
      if (!this.memo.title || !this.memo.description) {
        return
      }
      console.dir(this.memo)
      this.$store.commit('addMemo', this.memo)
      this.memo = this.emptyMemo()
    },
    emptyMemo () {
      return {
        id: 0,
        title: '',
        description: '',
        done: false,
        updateAt: null
      }
    }
  },
  watch: {
    'memo' (n, o) {
      console.log('new: %s, old: %s', JSON.stringify(n), JSON.stringify(o))
    }
  }
}
</script>
