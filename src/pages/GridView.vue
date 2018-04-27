<template>
  <div class="grid-view container-fluent text-center">
    <slot name="header" v-bind:title="title" />
    <popper trigger="click" v-bind:options="{placement: 'top'}">
      <div class="popper">
        Popper Content
      </div>
      <button slot="reference">
        Reference Element
      </button>
    </popper>
    <div>
      <b-dropdown id="ddown-header" text="Dropdown with header" class="m-md-2" toggle-class="btn btn-danger">  <!--toggle-class="btn btn-danger"-->
        <b-dropdown-header>Dropdown header</b-dropdown-header>
        <b-dropdown-item-button>First item</b-dropdown-item-button>
        <b-dropdown-item-button>Second Item</b-dropdown-item-button>
      </b-dropdown>
    </div>
    <div>
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
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'

export default {
  name: 'GridView',
  components: {
    Popper: Popper
  },
  data () {
    return {
      title: 'Grid View'
    }
  },
  created () {
    console.log(this.routeInfo)
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
  background: coral;
}
</style>
