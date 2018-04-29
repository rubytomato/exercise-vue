<template>
  <div class="details container-fluent text-center">
    <!-- <slot name="header" v-bind:title="title" /> -->
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
                v-on:click.prevent="togglePlatform(platform)">
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
              v-on:click="toggleMillion">
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
  // pathの:idを直接書き換えたときの対応
  beforeRouteUpdate (to, from, next) {
    this.targetId = to.params.id
    next()
  },
  methods: {
    toggleMillion () {
      this.$store.commit('toggleMillion', {id: this.memo.id})
    },
    togglePlatform (_platform) {
      this.$store.commit('togglePlatform', {id: this.memo.id, platform: _platform})
    },
    getTargetPlatformClass (_platform) {
      if (this.memo.platforms.length === 0) {
        return 'badge-dark'
      }
      return this.memo.platforms.includes(_platform) ? 'badge-info' : 'badge-dark'
    },
    historyBack () {
      this.$router.back()
    }
  },
  computed: {
    memo () {
      if (!this.targetId) {
        console.error('invalid id')
        return CONSTANTS.ERROR_MEMO
      }
      return this.$store.getters.memoById(parseInt(this.targetId, 10))
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
  // filterの中ではthisは使えない
  // filters: {
  //   formatedUpdateAt (value) {
  //     if (!value) {
  //       return ''
  //     }
  //     return this.$moment(value).format('YYYY/MM/DD a hh:mm:ss')
  //   }
  // },
  // watch: {
  //   '$route' (to, from) {
  //     console.dir(to)
  //     console.dir(from)
  //   }
  // }
}
</script>
