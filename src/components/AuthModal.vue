<template id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div v-if="loadingNewGuestSession == true">
          Creating Guest Session...
        </div>
        <div
          v-else
          class="modal-container col-11 col-sm-10 col-md-6 col-lg-4"
          @click.stop=""
        >
          <button class="modal-default-button" @click="$emit('close')">
            <span class="material-icons-outlined">cancel</span>
          </button>
          <div class="p-0 mt-3 modal-header">
            <h3>Sign In</h3>
          </div>
          <div class="modal-body py-5">
            <button
              title="Login with your account on The Movie Database"
              class="tmdb-button col-12  py-2"
              @click="signInAuth"
            >
              <img id="tmdb-logo" src="../assets/primary-short.svg" />
            </button>
          </div>
          <p v-if="onlyTmdbModal">Sign in with TMDB to Favorite!</p>
          <p v-if="!onlyTmdbModal">
            - or -
          </p>
          <div
            v-if="!onlyTmdbModal"
            class="pb-3 justify-content-center modal-footer"
          >
            <button class="guest-button p-2" @click.prevent="newGuestSession">
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AuthModal",
  props: ["onlyTmdbModal"],
  data() {
    return {
      loadingNewGuestSession: false
    };
  },
  computed: {
    ...mapGetters(["getToken", "getGuestSession"])
  },
  methods: {
    ...mapActions(["createGuestSession"]),
    async newGuestSession() {
      this.loadingNewGuestSession = true;
      this.createGuestSession();
      await this.getGuestSession;
      this.loadingNewGuestSession = false;
      this.$emit("close");
    },
    async signInAuth() {
      await this.getToken;
      window.open(
        "https://www.themoviedb.org/authenticate/" +
          this.getToken.request_token +
          "?redirect_to=" +
          process.env.VUE_APP_BASE_URL +
          this.$route.path,
        "_self"
      );
    }
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-wrapper {
}

.modal-container {
  vertical-align: middle;
  text-align: center;
  margin: 20vh auto;
  padding: 40px 60px;
  color: rgb(215, 215, 215);
  background-color: rgb(29, 51, 90);
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
}
.modal-footer {
  border: none;
}

.modal-body {
  /* margin: 20px 0; */
}

.modal-default-button {
  color: rgb(215, 215, 215);
  position: absolute;
  top: 0;
  right: 0;
  margin: -5px -10px 0 0;
  background: none;
  border: none;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#tmdb-logo {
  height: 30px;
}
.tmdb-button {
  color: #fff;
  border-radius: 4px;
  border: none;
  background-color: rgb(211, 211, 211);
  filter: drop-shadow(2px 1px 15px rgb(0, 0, 0));
}
.guest-button {
  color: #c6c6c6;
  border-radius: 4px;
  background-color: rgb(29, 51, 90);
  border: 1px solid #c6c6c6;
  filter: drop-shadow(2px 1px 15px rgb(0, 0, 0));
}

@media only screen and (max-width: 400px) {
  .modal-container {
    padding: 30px 40px;
  }
}
</style>
