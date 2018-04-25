<template>
  <main id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/" class="badge badge-primary">Go to Home</router-link>
      <router-link to="/memo" class="badge badge-primary">Go to Memo</router-link>
      <router-link to="/grid" class="badge badge-primary">Go to Grid</router-link>
    </div>
    <p>{{ getRouteInfo }}</p>
    <transition name="fade" mode="out-in">
    <router-view>
      <div slot="header" class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">Fluid jumbotron</h1>
          <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </div>
      </div>
      <div slot="footer" class="alert alert-success" role="alert">
        <h4 class="alert-heading">Well done!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </div>
    </router-view>
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

html {
  overflow-y: scroll;
}

body {
  padding: 1rem;
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
