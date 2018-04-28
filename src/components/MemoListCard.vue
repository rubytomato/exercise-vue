<template>
  <div class="card p-2 mb-2 float-lg-left" style="width: 18rem;" v-bind:class="{ 'border-primary': !memo.done, 'border-success': memo.done }">
    <div class="card-header text-left">
      <router-link :to="{name: 'MemoDetails', params:{ id: memo.id }}" v-bind:class="{ 'btn-sm btn-primary': !memo.done, 'btn-sm btn-success': memo.done }">{{ memo.id }}</router-link>
      <span class="card-title">{{ title }}</span>
    </div>
    <div class="card-body text-left" v-bind:class="{'text-primary': !memo.done, 'text-success': memo.done }">
      <template v-if="memo.platforms.length > 0">
        <span class="badge badge-info" style="margin-left: 2px;" v-for="(platform, index) in memo.platforms" :key="index">{{ platform }}</span>
      </template>
      <span class="card-text">{{ description }}</span>
    </div>
    <div class="card-footer text-right">
      <small class="text-muted">Release </small>
      <span>{{ releaseFromNow }}.</span>
      <span v-if="memo.done" class="badge badge-success">Played</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoListCard',
  data () {
    return {
      releaseFromNow: this.getReleaseFromNow()
    }
  },
  mounted () {
    window.setInterval(() => {
      this.releaseFromNow = this.getReleaseFromNow()
    }, 1000 * 60)
  },
  props: {
    'memo': {
      type: Object,
      required: true
    }
  },
  methods: {
    getReleaseFromNow () {
      if (!this.memo || !this.memo.updateAt) {
        return ''
      }
      return this.$moment(this.memo.updateAt).fromNow()
    },
    omissionAndPlusMidpoint (str, limit) {
      if (str.length < limit) {
        return str
      }
      return str.substr(0, limit) + '…'
    }
  },
  computed: {
    title: {
      get () {
        if (!this.memo || !this.memo.title) {
          return ''
        }
        return this.omissionAndPlusMidpoint(this.memo.title, 16)
      },
      set (_title) {
        // nothing
        throw Error('unsupported')
      }
    },
    description: {
      get () {
        if (!this.memo || !this.memo.description) {
          return ''
        }
        return this.omissionAndPlusMidpoint(this.memo.description, 60)
      },
      set (_description) {
        // nothing
        throw Error('unsupported')
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
