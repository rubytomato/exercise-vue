<template>
  <div class="card p-2 mb-2 float-lg-left" style="width: 18rem;" v-bind:class="{ 'border-primary': !memo.million, 'border-success': memo.million }">
    <div class="card-header text-left">
      <router-link
        v-bind:to="{name: 'MemoDetails', params:{ id: memo.id }}">
        {{ formatedTitle }}
      </router-link>
    </div>
    <div class="card-body text-left" v-bind:class="{'text-primary': !memo.million, 'text-success': memo.million }">
      <span class="badge badge-info" style="margin-left: 2px;"
        v-for="(platform, index) in memo.platforms"
        v-bind:key="index">
        {{ platform }}
      </span>
      <span class="card-text">{{ formatedDescription }}</span>
    </div>
    <div class="card-footer text-right">
      <small class="text-muted">released at</small>
      <span>{{ releasedAtFromNow }}.</span>
      <span class="badge badge-success" v-show="memo.million">Million</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoListCard',
  data () {
    return {
      releasedAtFromNow: this.getReleasedAtFromNow()
    }
  },
  mounted () {
    // releasedAtFromNowを1分ごとに更新する
    window.setInterval(() => {
      this.releasedAtFromNow = this.getReleasedAtFromNow()
    }, 1000 * 60)
  },
  props: {
    'memo': {
      type: Object,
      required: true
    }
  },
  methods: {
    getReleasedAtFromNow () {
      if (!this.memo || !this.memo.releasedAt) {
        return ''
      }
      return this.$moment(this.memo.releasedAt).fromNow()
    },
    getOmissionAndPlusMidpoint (str, limit) {
      if (str.length < limit) {
        return str
      }
      return str.substr(0, limit) + '…'
    }
  },
  computed: {
    formatedTitle () {
      if (!this.memo || !this.memo.title) {
        return ''
      }
      return this.getOmissionAndPlusMidpoint(this.memo.title, 16)
    },
    formatedDescription () {
      if (!this.memo || !this.memo.description) {
        return ''
      }
      return this.getOmissionAndPlusMidpoint(this.memo.description, 60)
    }
  },
  watch: {
    'memo' (n, o) {
      // console.log('new: %s, old: %s', JSON.stringify(n), JSON.stringify(o))
      console.log('watch memo')
    }
  }
}
</script>
