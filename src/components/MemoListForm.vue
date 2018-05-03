<template>
  <div class="card mb-2 float-lg-left" style="width: 18rem;">
    <div class="card-header text-left">
      <input type="text" class="form-control" placeholder="title"
        v-model.trim="memo.title">
    </div>
    <div class="card-body text-left">
      <textarea class="form-control" placeholder="description"
        v-model.trim="memo.description"/>
    </div>
    <div class="card-footer text-right">
      <button class="btn-sm btn-secondary" type="submit"
        v-on:click.prevent="addMemo">
        add
      </button>
    </div>
  </div>
</template>

<script>
import CONSTANTS from '@/constants'

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
      this.memo.platforms = []
      this.memo.million = false
      this.memo.releasedAt = new Date()
      this.$store.dispatch('addMemo', this.memo)
      this.memo = this.emptyMemo()
    },
    emptyMemo () {
      return CONSTANTS.NEW_EMPTY_MEMO()
    }
  },
  watch: {
    'memo' (n, o) {
      console.log('new: %s, old: %s', JSON.stringify(n), JSON.stringify(o))
    }
  }
}
</script>
