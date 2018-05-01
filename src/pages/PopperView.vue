<template>
  <div class="popper-view container-fluent text-center">
    <div class="row justify-content-start">
      <popper trigger="click" v-bind:options="{placement: 'top'}">
        <div class="popper">
          Popper Content
        </div>
        <button slot="reference">
          Reference Element
        </button>
      </popper>
    </div>
    <div class="row">
      <div class="col">
        <p>{{ method1() }}</p>
        <p>{{ method2='テスト' }}</p>
      </div>)
    </div>
  </div>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'

export default {
  name: 'PopperView',
  components: {
    'Popper': Popper
  },
  data () {
    return {
      title: 'Popper View',
      titleToggle: true,
      test: 'TEST'
    }
  },
  created () {
    console.log(this.routeInfo)
  },
  methods: {
    method1 () {
      return `method1: ${this.test}`
    }
  },
  computed: {
    method2: {
      get () {
        return `method2: ${this.test}`
      },
      set (val) {
        this.test = val
      }
    }
  }
}
</script>
