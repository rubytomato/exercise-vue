<template>
  <div class="details container-fluent text-center">
    <slot name="header" v-bind:title="title" />
    <div class="row justify-content-start">
      <div class="col">
        <div class="card">
          <div class="card-header text-left">
            <h5 class="card-title">{{ memo.title }}</h5>
          </div>
          <div class="card-body text-left">
            <p class="card-text">{{ memo.description }}</p>
            <button v-on:click="backToList" class="btn btn-primary">Back to List</button>
          </div>
          <div class="card-footer text-right">
            <p class="text-text">{{ formatedUpdateAt }}</p>
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
      title: `Details of Memo # ${this.$route.params.id}`
    }
  },
  created () {
    console.log(this.routeInfo)
  },
  methods: {
    backToList () {
      this.$router.push({name: 'MemoList'})
    }
  },
  computed: {
    memo () {
      if (!this.$route.params || !this.$route.params.id) {
        return
      }
      var id = parseInt(this.$route.params.id, 10)
      return this.$store.getters.memo(id)
    },
    formatedUpdateAt: {
      get () {
        if (!this.memo.updateAt) {
          return ''
        }
        return this.$moment(this.memo.updateAt).format('YYYY/MM/DD a hh:mm:ss')
      },
      set (_updateAt) {
        // nothing
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
      console.dir(to)
      console.dir(from)
    }
  }
}
</script>
