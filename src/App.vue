<template>
  <div id="app" class="container-fluid">
    <header>
      <nav id="nav">
        <router-link :to="{name: 'Home'}">Home</router-link> |
        <router-link :to="{name: 'Discover'}">Discover</router-link>
        <api-search-form ></api-search-form>
      </nav> 
    </header>
    <main class="min-vh-100">
      <router-view />
    </main>
    <main-footer></main-footer>
  </div>
</template>

<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ApiSearchForm from './components/ApiSearchForm.vue';
import MainFooter from './components/MainFooter.vue';



export default {
  name: "App",
  components: {
    ApiSearchForm,
    MainFooter
  },
  data: function () {
  return {

  }
},
  methods: {
    getConfs: function () {
      this.$http.get(this.baseURI + this.endpoint.configuration + this.keyPref+this.apiV3Key)
      .then((response) => {
        console.log(response);
        this.configuration = response
        console.log("this.configuration: "+ this.configuration)
      })
    }
  },
  mounted() {
    this.getConfs
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
}

#nav {
  padding: 30px;
  border-bottom: 1px solid #42b983;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
