<template>
  <div class="grid-view container-fluent text-center">
    <slot name="header" v-bind:title="title" />
    <div class="row justify-content-start">
      <div class="col">
        <button class="btn btn-danger" v-on:click="titleToggle = !titleToggle">toggle</button>
      </div>
    </div>
    <div class="row justify-content-start">
      <div class="col">
        <b-dropdown id="ddown-header" text="Dropdown with header" class="m-md-2" toggle-class="btn btn-danger">
          <b-dropdown-header>Dropdown header</b-dropdown-header>
          <b-dropdown-item-button>First item</b-dropdown-item-button>
          <b-dropdown-item-button>Second Item</b-dropdown-item-button>
        </b-dropdown>
      </div>
    </div>
    <div class="row">
      <div class="card-body">
        <div class="row">
          <div class="col-sm">
            One of three columns
          </div>
          <div class="col-sm">
            One of three columns
          </div>
          <div class="col-sm">
            One of three columns
          </div>
        </div>
        <div class="row">
          <div class="col">
            A
          </div>
          <div class="col">
            A
          </div>
          <div class="col">
            A
          </div>
          <div class="col">
            A
          </div>
        </div>
        <div class="row">
          <div class="col-sm-8">col-sm-8</div>
          <div class="col-sm-4">col-sm-4</div>
        </div>
        <div class="row">
          <div class="col-sm">col-sm</div>
          <div class="col-sm">col-sm</div>
          <div class="col-sm">col-sm</div>
        </div>
      </div>
    </div>
    <slot name="footer"/>
  </div>
</template>

<script>
export default {
  name: 'GridView',
  data () {
    return {
      title: 'Grid View',
      titleToggle: true
    }
  },
  created () {
    console.log(this.routeInfo)
  },
  watch: {
    'titleToggle' (n, o) {
      if (n) {
        this.title = this.title.toLowerCase()
      } else {
        this.title = this.title.toUpperCase()
      }
    }
  }
}
</script>

<style scoped>
.dropdown .dropdown-menu .dropdown-item:focus {
  outline: none;
}
.col-sm,
.col {
  margin: 1px;
}
</style>
