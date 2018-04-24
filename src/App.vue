<template>
  <main id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/">Go to Home</router-link>
      <router-link to="/memo">Go to Memo</router-link>
    </div>
    <p>{{ getRouteInfo }}</p>
    <transition name="fade" mode="out-in">
    <router-view/>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'App',
  computed: {
    getRouteInfo () {
      console.log(this)
      return `${this.$route.name} : ${this.$route.path}`
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  padding-top: 5rem;
}

.container {
  max-width: 960px;
}

.border-top {
  border-top: 1px solid #e5e5e5;
}

.border-bottom {
  border-bottom: 1px solid #e5e5e5;
}

.border-top-gray {
  border-top-color: #adb5bd;
}

.box-shadow {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}

.lh-condensed {
  line-height: 1.25;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
