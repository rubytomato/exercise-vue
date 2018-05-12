<template>
  <main id="app">
    <div class="header mb-3">
      <div>
        <router-link to="/" class="badge badge-primary">Home</router-link>
        <router-link v-bind:to="{name: 'SignIn'}" class="badge badge-primary">Sign In</router-link>
        <router-link to="/memo-list" class="badge badge-primary">Memo List</router-link>
        <router-link v-bind:to="{name: 'SimpleForm'}" class="badge badge-primary">Simple Form</router-link>
        <router-link to="/grid-view" class="badge badge-primary">Grid View</router-link>
        <router-link to="/popper-view" class="badge badge-primary">Popper View</router-link>
        <router-link to="/check-out" class="badge badge-primary">Check Out</router-link>
      </div>
      <div>
        <p>{{ currentDateToString }}</p>
        <p>uptime: {{ days }} days. {{ hours }} hours {{ minutes }} min {{ seconds }} sec</p>
      </div>
    </div>
    <!-- <transition name="fade" mode="out-in"> -->
    <router-view>
      <div slot="header" class="jumbotron jumbotron-fluid" slot-scope="slotProps">
        <div class="container">
          <figure class="figure">
            <img src="./assets/logo.png" class="figure-img img-fluid rounded">
            <figcaption class="figure-caption">Vue.js Logo.</figcaption>
          </figure>
          <p class="lead">{{ slotProps.title }}</p>
        </div>
      </div>
      <div slot="footer" class="alert alert-success" role="alert">
        <h4 class="alert-heading">Well done!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </div>
    </router-view>
    <!-- </transition> -->
  </main>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      startDate: this.getCurrentTime(),
      currentDate: this.getCurrentTime()
    }
  },
  mounted () {
    window.setInterval(() => {
      this.currentDate = this.getCurrentTime()
    }, 1000)
  },
  methods: {
    getCurrentTime () {
      return Math.trunc(new Date().getTime() / 1000)
    }
  },
  computed: {
    currentDateToString () {
      return this.$moment(this.currentDate * 1000).locale('ja').format('YYYY/MM/DD a hh:mm:ss')
    },
    seconds () {
      return (this.currentDate - this.startDate) % 60
    },
    minutes () {
      return Math.trunc((this.currentDate - this.startDate) / 60) % 60
    },
    hours () {
      return Math.trunc((this.currentDate - this.startDate) / 60 / 60) % 24
    },
    days () {
      return Math.trunc((this.currentDate - this.startDate) / 60 / 60 / 24)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}

html {
  overflow-y: scroll;
}

body {
  padding: 1rem;
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

.header {
  text-align: center;
}

.card {
  margin-left: 2px;
  margin-right: 2px;
}
</style>
