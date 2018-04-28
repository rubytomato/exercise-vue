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
                v-bind:class="targetPlatform(platform)"
                v-on:click.prevent="togglePlatform(platform)"
                v-for="(platform, index) in platforms"
                v-bind:key="index">
                {{ platform }}
              </a>
            </h6>
          </div>
          <div class="card-body text-left">
            <p class="card-text" v-html="formatedDescription"/>
            <hr class="mb-3">
            <small>Release Date. {{ formatedReleaseDate }}</small>
          </div>
          <div class="card-footer text-right">
            <button v-on:click="togglePlay" class="btn" v-bind:class="{'btn-primary': memo.done, 'btn-success': !memo.done}">
              <span v-if="!memo.done">to Played</span>
              <span v-else>to Unplayed</span>
            </button>
            <router-link v-bind:to="{name: 'MemoList'}" class="btn btn-primary" tag="button">Back to List</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoDetails',
  data () {
    return {
      platforms: ['FC', 'SFC', 'GB', '64', 'GC', 'DS', 'Wii', '3DS', 'Wii U', 'Switch'],
      targetId: this.id
    }
  },
  props: ['id'],
  created () {
    console.log(this.routeInfo)
  },
  beforeRouteUpdate (to, from, next) {
    this.targetId = to.params.id
    next()
  },
  methods: {
    togglePlay () {
      this.$store.commit('toggleMemo', this.memo.id)
    },
    togglePlatform (_platform) {
      this.$store.commit('togglePlatform', {id: this.memo.id, platform: _platform})
    },
    targetPlatform (_platform) {
      if (this.memo.platforms.length === 0) {
        return 'badge-dark'
      }
      return this.memo.platforms.includes(_platform) ? 'badge-info' : 'badge-dark'
    }
  },
  computed: {
    memo () {
      if (this.targetId) {
        return this.$store.getters.memoById(parseInt(this.targetId, 10))
      }
      return {id: -1, title: 'unknown', description: 'unknown', platforms: [], done: false, updateAt: new Date()}
    },
    title: {
      get () {
        return `Details of Memo # ${this.targetId}`
      }
    },
    formatedDescription: {
      get () {
        var desc = this.memo.description.replace('『', '<span class="badge-lg badge-pill badge-success p-1">').replace('』', '</span>')
        return desc
      }
    },
    formatedReleaseDate: {
      get () {
        if (!this.memo.updateAt) {
          return ''
        }
        return this.$moment(this.memo.updateAt).format('YYYY/MM/DD')
      },
      set (_updateAt) {
        // nothing
        throw Error('unsupported')
      }
    }
  },
  // filterの中ではthisは使えない
  // filters: {
  //   formatedUpdateAt (value) {
  //     if (!value) {
  //       return ''
  //     }
  //     return this.$moment(value).format('YYYY/MM/DD a hh:mm:ss')
  //   }
  // },
  watch: {
    '$route' (to, from) {
      // console.dir(to)
      // console.dir(from)
    }
  }
}
</script>
