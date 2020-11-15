<template>
  <div id="app" class="container-fluid">
    <header>
      <navbar />
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

import Navbar from './components/Navbar.vue';
import MainFooter from './components/MainFooter.vue';



export default {
  name: "App",
  components: {
    MainFooter,
    Navbar
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
  color: white;
  background-color: rgb(7, 14, 22);
  padding: 0;
}
a {
    text-emphasis: none;
    text-decoration: none;
    color: white;
    opacity: 0.7;
}
a:hover {
  color: white;
  text-emphasis: none;
  text-decoration: none;
  opacity: 1;
}
.router-view {
  background: linear-gradient(-90.68deg, #061c24e1 0%, #082025f3 49.72%,  #09252cd5 100%)
}
</style>
