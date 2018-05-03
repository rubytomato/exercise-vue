<template>
  <div class="details container-fluent text-center">
    <div class="row justify-content-start">
      <div class="col">
        <div class="card">
          <div class="card-header text-left">
            <h5 class="card-title">{{ memo.title }}</h5>
            <h6 class="card-subtitle text-muted">Platform:
              <a href="#" class="badge" style="margin-left:4px;"
                v-for="(platform, index) in platforms"
                v-bind:key="index"
                v-bind:class="getTargetPlatformClass(platform)"
                v-on:click.prevent="updatePlatform(platform)">
                {{ platform }}
              </a>
            </h6>
          </div>
          <div class="card-body text-left">
            <p class="card-text" v-html="formatedDescription"/>
            <hr class="mb-3">
            <small>Release Date. {{ formatedReleasedAt }}</small>
          </div>
          <div class="card-footer text-right">
            <button class="btn"
              v-bind:class="{'btn-primary': memo.million, 'btn-success': !memo.million}"
              v-on:click="updateMillion()">
              {{ millionButtonLabel }}
            </button>
            <button class="btn btn-primary"
              v-on:click="historyBack">
              back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANTS from '@/constants'

export default {
  name: 'MemoDetails',
  data () {
    return {
      targetId: this.id
    }
  },
  // routeの動的セグメント
  props: ['id'],
  created () {
    // for debug
    console.log(this.routeInfo)
  },
  mounted () {
    this.init()
    this.start()
  },
  destroyed () {
    this.stop()
  },
  // コンポーネント内ガード
  // このコンポーネントを描画するルートが確立する前に呼ばれます
  beforeRouteEnter (to, from, next) {
  // `this` でのこのコンポーネントへのアクセスはできません
    next()
  },
  // コンポーネント内ガード
  // このコンポーネントを描画するルートが変更されたときに呼び出されます
  beforeRouteUpdate (to, from, next) {
    // `this` でのコンポーネントインスタンスへのアクセスができます
    // pathの:idを直接書き換えたときの対応
    this.targetId = to.params.id
    next()
  },
  // コンポーネント内ガード
  // このコンポーネントを描画するルートが間もなくナビゲーションから離れていく時に呼ばれます
  beforeRouteLeave (to, from, next) {
  // `this` でのコンポーネントインスタンスへのアクセスができます
    next()
  },
  methods: {
    init () {
      this.$store.dispatch('clearMemo')
    },
    start () {
      this.$store.dispatch('startMemoListener', { id: this.targetId })
    },
    stop () {
      this.$store.dispatch('stopMemosListener')
    },
    updateMillion () {
      this.$store.dispatch('updateMillionOfMemo', { id: this.memo.id })
    },
    updatePlatform (platform) {
      this.$store.dispatch('updatePlatformOfMemo', { id: this.memo.id, platform: platform })
    },
    getTargetPlatformClass (platform) {
      if (!this.memo.platforms || this.memo.platforms.length === 0) {
        return 'badge-dark'
      }
      return this.memo.platforms.includes(platform) ? 'badge-info' : 'badge-dark'
    },
    historyBack () {
      this.$router.back()
    }
  },
  computed: {
    memo () {
      if (!this.targetId) {
        return CONSTANTS.ERROR_MEMO
      }
      return this.$store.getters.memo
    },
    platforms () {
      return CONSTANTS.PLATFORMS
    },
    formatedDescription () {
      if (!this.memo.description) {
        return ''
      }
      return this.memo.description
        .replace('『', '<span class="badge-lg badge-pill badge-success p-1">')
        .replace('』', '</span>')
    },
    formatedReleasedAt () {
      if (!this.memo.releasedAt) {
        return ''
      }
      return this.$moment(this.memo.releasedAt).format('YYYY/MM/DD')
    },
    millionButtonLabel () {
      return !this.memo.million ? 'is Million ?' : 'is not Million ?'
    }
  }
}
</script>
