<template>
  <div
    name="persons-detail"
    v-if="this.$route.params.media_type == 'person'"
    class="router-view container-fluid pb-5"
  >
    <section class="row" id="hero">
      <img
        id="hero-image"
        :src="
          img.secure_base_url +
            img.backdrop_sizes[3] +
            getCredits[0].backdrop_path
        "
      />
      <div class="row" id="profile-pic">
        <div class="col-4">
          <img
            class="poster"
            :src="img.base_url + img.poster_sizes[3] + getDetails.profile_path"
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
                  title="title"
                  >{{ getDetails.name }}
                </span>
              </div>
            </div>

            <div class="col text-left mt-4"></div>
          </div>
        </div>
      </div>
      <a @click="$router.go(-1).catch(e => {})">
        <span id="back" class="fas fa-chevron-left"></span>
      </a>
      <a>
        <span id="like" class="fas fa-heart"> </span>
      </a>
    </section>
    <section class="py-5" name="person-credits">
      <awesome-swiper
        :mediaItems="getCredits"
        sliderHeading="Credits"
        :spaceBetween="15"
        :numSlidesProp="10"
      ></awesome-swiper>
    </section>
  </div>
</template>

<script>
import AwesomeSwiper from "../components/AwesomeSwiper.vue";

export default {
  components: {
    AwesomeSwiper
  }
};
</script>
