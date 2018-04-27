<template>
  <div class="card p-2 mb-2 float-lg-left" style="width: 20rem;" v-bind:class="{ 'border-primary': !memo.done, 'border-success': memo.done }">
    <div class="card-header text-left">
      <router-link :to="{name: 'MemoDetails', params:{ id: memo.id }}" v-bind:class="{ 'btn-sm btn-primary': !memo.done, 'btn-sm btn-success': memo.done }">{{ memo.id }}</router-link>
      <span class="card-title">{{ titleSubStr }}</span>
    </div>
    <div class="card-body text-left" v-bind:class="{'text-primary': !memo.done, 'text-success': memo.done }">
      <p class="card-text">{{ memo.description }}</p>
    </div>
    <div class="card-footer text-right">
      <small class="text-muted">last updated </small>
      <span>{{ updateAtFromNow }}.</span>
      <span v-if="memo.done" class="badge badge-success">Done</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoListCard',
  data () {
    return {
      updateAtFromNow: this.getFormatedUpdateAtFromNow()
    }
  },
  mounted () {
    window.setInterval(() => {
      this.updateAtFromNow = this.getFormatedUpdateAtFromNow()
    }, 1000 * 60)
  },
  props: {
    'memo': {
      type: Object,
      required: true
    }
  },
  methods: {
    getFormatedUpdateAtFromNow () {
      if (!this.memo || !this.memo.updateAt) {
        return ''
      }
      return this.$moment(this.memo.updateAt).fromNow()
    }
  },
  computed: {
    titleSubStr: {
      get () {
        if (!this.memo || !this.memo.title) {
          return ''
        }
        if (this.memo.title.length < 25) {
          return this.memo.title
        }
        return this.memo.title.substr(0, 25) + ' ...'
      },
      set (_title) {
        // nothing
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
