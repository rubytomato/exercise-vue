<template>
  <div class="hello container-fluent text-center">
    <slot name="header" v-bind:title="title" />
    <div class="row justify-content-start">
      <h2 class="col">Essential Links</h2>
    </div>
    <div class="row">
      <ul class="col">
        <li>
          <a
            href="https://vuejs.org"
            target="_blank"
          >
            Core Docs
          </a>
        </li>
        <li>
          <a
            href="https://forum.vuejs.org"
            target="_blank"
          >
            Forum
          </a>
        </li>
        <li>
          <a
            href="https://chat.vuejs.org"
            target="_blank"
          >
            Community Chat
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/vuejs"
            target="_blank"
          >
            Twitter
          </a>
        </li>
        <br>
        <li>
          <a
            href="http://vuejs-templates.github.io/webpack/"
            target="_blank"
          >
            Docs for This Template
          </a>
        </li>
      </ul>
    </div>
    <div class="row">
      <h2 class="col">Ecosystem</h2>
    </div>
    <div class="row">
      <ul class="col">
        <li>
          <a
            href="http://router.vuejs.org/"
            target="_blank"
          >
            vue-router
          </a>
        </li>
        <li>
          <a
            href="http://vuex.vuejs.org/"
            target="_blank"
          >
            vuex
          </a>
        </li>
        <li>
          <a
            href="http://vue-loader.vuejs.org/"
            target="_blank"
          >
            vue-loader
          </a>
        </li>
        <li>
          <a
            href="https://github.com/vuejs/awesome-vue"
            target="_blank"
          >
            awesome-vue
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    console.log(this.getRouteInfo())
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
