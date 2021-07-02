<template>
  <div id="app">
    <header>
      <navbar />
    </header>
    <main class="min-vh-100">
      <router-view />
    </main>
    <b-nav-item-dropdown class="lang-selector" text="Lang" right>
      <b-dropdown-item href="#"> EN</b-dropdown-item>
      <b-dropdown-item href="#"> ES</b-dropdown-item>
      <b-dropdown-item href="#"> FR</b-dropdown-item>
      <b-dropdown-item href="#"> RU</b-dropdown-item>
    </b-nav-item-dropdown>
    <main-footer></main-footer>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Navbar from "./components/Navbar.vue";
import MainFooter from "./components/MainFooter.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    MainFooter,
    Navbar
  },
  data: function() {
    return {};
  },
  computed: {
    ...mapGetters(["getApiConf"]),
    authSuccess() {
      return this.$route.query.request_token;
    }
  },
  methods: {
    ...mapActions(["reqApiConfs", "createSessionGetAccount", "reqSessionToken"])
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler(newVal) {
        if (this.$store.state.Session) {
          return;
        } else if (newVal.approved == "true") {
          this.createSessionGetAccount({
            approved_token: newVal.request_token
          });
        } else {
          console.log("TMDB Auth Not Yet Granted");
        }
      }
    }
  },
  created() {
    window.addEventListener("resize", this.$store.commit("setWindowWidth"));
    this.reqSessionToken();
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "Metropolis-Black";
  src: local("Metropolis-Black"),
    url(./fonts/Metropolis/Metropolis-Black.otf) format("opentype");
}
@font-face {
  font-family: "Bebas-Neue";
  src: local("BebasNeue-Regular"),
    url(./fonts/BebasNeue-Regular.otf) format("opentype");
}
@font-face {
  font-family: "Metropolis-Regular";
  src: local("Metropolis-Regular"),
    url(./fonts/Metropolis/Metropolis-Regular.otf) format("opentype");
}
@font-face {
  font-family: "Metropolis-Bold";
  src: local("Metropolis-Bold"),
    url(./fonts/Metropolis/Metropolis-Bold.otf) format("opentype");
}
@font-face {
  font-family: "Cocon";
  src: local("Cocon-Regular-Font"),
    url(./fonts/Cocon/Cocon-Regular-Font.otf) format("opentype");
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
}
#app {
  font-family: Metropolis-Regular, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-color: rgb(7, 14, 22);
}
h1,
h2 {
  font-family: Bebas-Neue;
}
a {
  text-emphasis: none;
  text-decoration: none;
  color: white;
}
a:hover {
  color: white;
  text-emphasis: none;
  text-decoration: none;
  opacity: 1;
}
.router-view {
  background: linear-gradient(
    -90.68deg,
    #061c24e1 0%,
    #082025f3 49.72%,
    #09252cd5 100%
  );
}
.lang-selector {
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.74);
  border: 1px solid grey;
  border-width: 1px 0 0 1px;
  border-radius: 20px 0 0 0;
  list-style: none;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 5px 5px 0;
}
.dropdown-toggle {
  color: rgb(187, 187, 187);
}
.dropdown-toggle:hover {
  color: grey;
}
.dropdown-menu {
  background-color: #0f4455;

  li > a {
    color: white;
  }
}
// [v-cloak] > * {
//   display: none;
// }
// [v-cloak] {
//   content: "Loading";
//   display: block;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(
//     -90.68deg,
//     #061c24e1 0%,
//     #3bb114f3 49.72%,
//     #09252cd5 100%
//   );
//   background-image: url("./assets/primary-short.svg");
// }
</style>
