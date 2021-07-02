<template>
  <b-navbar class="justify-content-around" toggleable="lg" type="dark">
    <b-navbar-brand>
      <router-link :to="{ name: 'Home' }"
        ><span
          style="display: inline-flex;
  align-items: center;"
          >FilmLake</span
        ></router-link
      >
    </b-navbar-brand>
    <b-navbar-nav class="mr-auto"> </b-navbar-nav>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse class="justify-content-end" id="nav-collapse" is-nav>
      <b-navbar-nav class="main-link">
        <api-search-form></api-search-form>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav style="align-items: center;">
        <b-nav-item class="main-link" right>
          <router-link :to="{ name: 'Discover' }" style="font-size: 24px;">
            <span title="Discover" class="far fa-compass" id="discover"
              ><span class="icon-text"> Discover</span></span
            >
          </router-link>
        </b-nav-item>
        <b-nav-item class="main-link" right>
          <router-link :to="{ name: 'Favorites' }" style="font-size: 24px;">
            <span title="Favorites" class="far fa-bookmark"
              ><span class="icon-text"> Favorites</span></span
            >
          </router-link>
        </b-nav-item>
        <b-nav-item class="main-link" right>
          <router-link :to="{ name: 'Ratings' }" style="font-size: 24px;">
            <span title="Ratings" class="far fa-comment-alt"
              ><span class="icon-text"> MyRatings</span></span
            >
          </router-link>
        </b-nav-item>

        <b-nav-item-dropdown
          v-if="getCurrentSessionId"
          :text="getAccount ? getAccount.username : 'Guest'"
          right
        >
          <b-dropdown-item @click="DeleteSession">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item right v-else-if="!getCurrentSessionId">
          <a id="show-modal" @click="showModal = true">
            Sign In
          </a>
          <auth-modal v-if="showModal" @close="showModal = false"></auth-modal>
        </b-nav-item>

        <!-- <b-nav-item-dropdown right>
          Using 'button-content' slot
          <template #button-content>
            <span>User</span>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import ApiSearchForm from "./ApiSearchForm.vue";
import AuthModal from "./AuthModal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ApiSearchForm,
    AuthModal
  },
  data: function() {
    return {
      showModal: false
    };
  },
  computed: {
    ...mapGetters(["getCurrentSessionId", "getAccount"])
  },
  methods: {
    ...mapActions(["DeleteSession"])
  }
};
</script>

<style lang="scss">
.navbar {
  padding: 10px 30px 10px 160px;
  border-bottom: 1px solid #42b983;
  background: linear-gradient(
    160.68deg,
    #0f495c 0%,
    #0d3640 49.72%,
    #08141f 100%
  );

  a {
    font-weight: bold;
  }
}
.navbar-brand {
  font-family: Bebas-Neue;
  font-size: 36px;
  .router-link-exact-active {
    color: #42b983;
  }
}
.navbar-toggler {
  color: #42b983;
}
.navbar-toggler,
.navbar-toggler:hover,
.navbar-toggler:focus {
  border: 0;
}
.main-link {
  margin-right: 40px;
}
.icon-text {
  font-size: 18px;
  vertical-align: middle;
  font-family: Metropolis-Regular, Avenir, Helvetica, Arial, sans-serif;
}

@media only screen and (max-width: 1472px) {
  .navbar {
    padding: 10px 25px;
  }
  .main-link {
    margin-right: 5px;
    font-size: 18px;
  }
}
@media only screen and (max-width: 300px) {
  .navbar {
    padding: 0px 10px;
  }
  .main-link {
    margin-right: 5px;
    font-size: 18px;
  }
}
</style>
