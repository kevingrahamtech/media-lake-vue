<template>
  <div id="app" class="">
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
import { mapActions, mapGetters } from 'vuex'



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
    ...mapActions(['reqConfs']),
    ...mapGetters(['getConfs'])
  },
  mounted() {
    this.reqConfs();
  }
}
</script>

<style lang="scss">
html,body {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden; 
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: rgb(7, 14, 22);
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
