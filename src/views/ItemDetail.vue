<template>
  <div
    name="persons-detail"
    v-if="this.$route.params.media_type == 'person'"
    class="router-view container-fluid pb-5"
  >
    <section class="row text-center" id="hero">
      <img
        id="hero-image"
        :src="
          img.secure_base_url +
            img.backdrop_sizes[3] +
            getCredits[0].backdrop_path
        "
      />
      <div class="img-overlay"></div>
      <div class="row" id="profile-pic">
        <div class="col-4">
          <img
            class="poster"
            :src="img.base_url + img.poster_sizes[2] + getDetails.profile_path"
          />
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-12 text-left">
              <div>
                <span
                  id="title"
                  class="px-4 py-2"
                  style="font-size: 4vw"
                  title="name"
                  >{{ getDetails.name }}
                </span>
                <span>{{
                  getDetails.known_for_department == "Acting"
                    ? "Actor"
                    : getDetails.known_for_department == "Directing"
                    ? "Director"
                    : getDetails.known_for_department
                }}</span>
              </div>
            </div>

            <div class="col text-left mt-4">
              <span>{{ getDetails.birthday }}</span>
              <span>{{ getDetails.deathday }}</span>
              <span>{{ getDetails.place_of_birth }}</span>
            </div>
          </div>
        </div>
      </div>
      <a @click="$router.go(-1).catch(e => {})">
        <span id="back" class="fas fa-chevron-left"></span>
      </a>
    </section>
    <section class="p-5" name="person-credits">
      <h1>Credits</h1>
      <awesome-swiper
        :mediaItems="getCredits"
        :spaceBetweenProp="10"
        :slidesPerViewProp="10"
      ></awesome-swiper>
    </section>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-11 col-md-8">{{ getDetails.biography }}</div>
        <div class="col-11 pt-5">
          <a :href="'https://www.imdb.com/name/' + getDetails.imdb_id">
            <img src="../assets/imdb.png" style="height: 30px" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
  <div v-else class="router-view container-fluid pb-5">
    <section class="row d-flex justify-content-center" id="hero">
      <img
        id="hero-image"
        :src="img.base_url + img.backdrop_sizes[3] + getDetails.backdrop_path"
        alt="getDetails.title || getDetails.name"
      />
      <div class="img-overlay"></div>
      <div class="row" id="hero-banner">
        <div class="col-2">
          <img
            class="poster"
            :src="
              img.base_url +
                img.poster_sizes[1] +
                (getDetails.poster_path || getDetails.profile_path)
            "
          />
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-12 text-left">
              <div>
                <span
                  id="title"
                  class="px-4 py-2"
                  style="font-size: 4vw"
                  title="title"
                  >{{ getDetails.title || getDetails.name }}
                  <span
                    v-if="media_type == 'movie'"
                    id="runtime"
                    title="runtime"
                    ><i class="far fa-clock"></i>
                    {{ runtime(getDetails.runtime) }}</span
                  >
                  <span
                    v-if="media_type == 'tv'"
                    id="showrunning"
                    title="last episode"
                    ><i class="fa fa-book"></i>
                    {{ getDetails.number_of_seasons }} seasons
                    {{ getDetails.number_of_episodes }} episodes</span
                  >
                </span>
              </div>
            </div>
            <div class="col-12 text-left mt-4 mr-3">
              <span
                v-if="getDetails.release_date"
                class="px-4 py-2 mr-3"
                id="year"
                :title="getDetails.release_date"
                >{{ getDetails.release_date.slice(0, -6) }}</span
              >
              <span
                v-if="getDetails.first_air_date"
                class="px-4 py-2 mr-3"
                id="year"
                :title="'First air: ' + getDetails.first_air_date"
                >{{ getDetails.first_air_date.slice(0, -6) }}</span
              >
              <span class="px-4 py-2" id="rating" title="average rating"
                ><i class="fa fa-star"></i> {{ getDetails.vote_average }}</span
              >
            </div>
            <div class="col text-left mt-4"></div>
          </div>
        </div>
      </div>
      <a @click="$router.go(-1).catch(e => {})">
        <span id="back" class="fas fa-chevron-left"></span>
      </a>
      <a @click="toggleFavorite">
        <span
          class="fas fa-heart favorite"
          :class="{ active_favorite: favBool }"
        ></span>
      </a>
      <auth-modal
        v-if="showModal"
        @close="showModal = false"
        :onlyTmdbModal="onlyTmdbModal"
      ></auth-modal>
    </section>
    <section class="row py-5 justify-content-center" id="details">
      <div class="col-11 col-md-8 col-lg-4 mx-2" id="card">
        <h2>Overview</h2>
        <span>{{ getDetails.overview }}</span>
      </div>
      <div v-if="getDetails.revenue > 0" class="mx-2" id="card">
        <h2>Revenue</h2>
        <div id="revenue">${{ numberWithCommas(getDetails.revenue) }}</div>
      </div>
      <div v-if="media_type == 'tv'" class="m-5">
        <h2>Streaming Now</h2>
        <div
          v-for="provider in getProviders.US.flatrate"
          :key="provider.provider_id"
          class="col-12 col-md-5 col-lg-3 pb-2 align-middle"
        >
          <img
            v-if="provider.logo_path"
            id="logo"
            :src="img.base_url + img.logo_sizes[4] + provider.logo_path"
            :title="provider.provider_name"
          />
          <h3 v-else>{{ company.name }}</h3>
        </div>
      </div>
    </section>
    <div class="container">
      <div
        class="row justify-content-around align-items-center py-5"
        id="studios"
      >
        <div
          v-for="company in getDetails.production_companies"
          :key="company.id"
          class="col-12 col-md-5 col-lg-3 pb-2"
        >
          <img
            v-if="company.logo_path"
            id="logo"
            :src="img.base_url + img.logo_sizes[4] + company.logo_path"
            alt=""
          />
          <h3 v-else>{{ company.name }}</h3>
        </div>
      </div>
    </div>
    <div v-if="getReviews.length" class="container">
      <div class="row justify-content-around py-5" id="">
        <h1>Reviews</h1>
        <article
          v-for="review in getReviews"
          :key="review.id"
          id="review"
          class="col-11 px-3 py-5 mb-3"
        >
          <div class="row justify-content-center">
            <div class="col-12 col-md-2">
              <img
                v-if="review.author_details.avatar_path"
                id="profile"
                :src="
                  img.base_url +
                    img.profile_sizes[0] +
                    review.author_details.avatar_path
                "
                alt=""
              />
              <br />
              <span>{{ review.author }}</span>
              <br />
              <span v-if="review.author_details.rating" title="Author's Rating"
                >Rating: {{ review.author_details.rating }}/10</span
              >
            </div>
            <div class="col-12 col-md-10 text-left">
              {{ review.content }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AwesomeSwiper from "../components/AwesomeSwiper.vue";
import AuthModal from "../components/AuthModal.vue";

export default {
  name: "ItemDetail",
  components: {
    AwesomeSwiper,
    AuthModal
  },
  data() {
    return {
      media_type: this.$route.params.media_type,
      id: this.$route.params.id,
      favBool: false,
      showModal: false,
      onlyTmdbModal: false
    };
  },
  mounted() {
    this.reqDetails({
      media_type: this.media_type,
      id: this.id
    });
    if (this.media_type == "tv") {
      this.reqProviders({
        media_type: this.media_type,
        id: this.id
      });
    }
    if (this.media_type !== "person") {
      if (this.getFavoriteMovies) {
        let favMovies = this.getFavoriteMovies;
        for (let i = 0; i < favMovies.length; i++) {
          if (favMovies[i].id == this.id) {
            this.favBool = true;
          }
        }
      } else this.favBool = false;

      if (this.getFavoriteTv) {
        let favTv = this.getFavoriteTv;
        for (let i = 0; i < favTv.length; i++) {
          if (favTv[i].id == this.id) {
            this.favBool = true;
          }
        }
      } else this.favBool = false;
    }
  },
  watch: {
    getFavoriteMovies() {
      if (this.getFavoriteMovies) {
        let favMovies = this.getFavoriteMovies;
        for (let i = 0; i < favMovies.length; i++) {
          if (favMovies[i].id == this.id) {
            this.favBool = true;
          }
        }
      } else this.favBool = false;
    },
    getFavoriteTv() {
      if (this.getFavoriteTv) {
        let favTv = this.getFavoriteTv;
        for (let i = 0; i < favTv.length; i++) {
          if (favTv[i].id == this.id) {
            this.favBool = true;
          }
        }
      } else this.favBool = false;
    }
  },
  computed: {
    ...mapGetters([
      "getApiConf",
      "getCurrentSessionId",
      "getSession",
      "getDetails",
      "getReviews",
      "getProviders",
      "getCredits",
      "getPersonImages",
      "getFavoriteMovies",
      "getFavoriteTv"
    ]),
    img() {
      return this.getApiConf.images;
    }
  },
  methods: {
    ...mapActions(["reqDetails", "reqProviders", "postFavoriteGetFavorites"]),
    async toggleFavorite() {
      if (this.getSession) {
        this.favBool = !this.favBool;
        this.postFavoriteGetFavorites({
          media_type: this.$attrs.media_type,
          media_id: this.$route.params.id,
          favorite: this.favBool
        });
      } else if (this.getCurrentSessionId) {
        this.showModal = true;
        this.onlyTmdbModal = true;
      } else {
        this.showModal = true;
      }
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    runtime(time) {
      if (!time) {
        return;
      } else if (time > 60) {
        let hrs = Math.floor(time / 60);
        if (time % 60 !== 0) {
          return hrs + ":" + (time % 60);
        } else {
          return hrs + "hrs";
        }
      } else if (time < 60) {
        return time + "mins";
      }
    }
  }
};
</script>

<style scoped>
#hero {
  position: relative;
  height: 70vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.296);
}
#back,
#back:focus,
.favorite {
  font-size: 78px;
  cursor: pointer;
}
#back {
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  margin: 30px;
}
#back:hover {
  color: rgb(204, 204, 204);
}
.favorite {
  color: rgba(255, 255, 255, 0.66);
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 130px;
  margin-bottom: 60px;
}
.favorite:hover {
  color: white;
}
.active_favorite {
  color: #42b983;
  text-shadow: 0 0 1.5rem #42b983;
}
.active_favorite:hover {
  color: #379c6f;
}
.img-overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: #000;
  opacity: 0.7;
}
#hero-image {
  width: auto;
  position: relative;
}
.poster {
  border-radius: 15px;
  position: relative;
}
#hero-banner {
  font-size: 4vw;
  line-height: 1;
  color: white;
  position: absolute;
  top: 50%;
  left: 10%;
  z-index: 2;
}
#profile-pic {
  font-size: 4vw;
  line-height: 1;
  color: white;
  position: absolute;
  top: 30%;
  left: 10%;
  z-index: 2;
}
#title {
  font-size: 4vw;
  /* background-color: rgba(0, 0, 0, 0.741); */
}
#runtime,
#showrunning {
  font-size: 1.5vw;
}
#year,
#rating {
  font-size: 3vw;
  /* background-color: rgba(0, 0, 0, 0.741); */
}

#details {
  color: #fff;
}
#card {
  background-color: rgba(67, 67, 67, 0.275);
  border-radius: 20pt;
  padding: 5rem;
}
#revenue {
  font-size: 4vw;
}
h2 {
  font-size: 3vw;
}
#logo {
  width: 100%;
}
#studios {
  color: black;
  background-color: #e6e6e6;
  border-radius: 20pt;
}
#review {
  background-color: rgba(67, 67, 67, 0.275);
  border-radius: 20pt;
}
#profile {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
</style>
