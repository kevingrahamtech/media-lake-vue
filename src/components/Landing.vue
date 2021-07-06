<template>
  <section class="container py-5">
    <div id="heading">
      <h1 class="py-3">
        Recently Trending
      </h1>
    </div>
    <awesome-swiper
      :topBorderProp="true"
      :mediaItems="getMovieTrending"
      sliderHeading="Movies"
    ></awesome-swiper>
    <awesome-swiper
      :topBorderProp="true"
      :mediaItems="getTvTrending"
      sliderHeading="Tv"
    ></awesome-swiper>
    <awesome-swiper
      :topBorderProp="true"
      :mediaItems="getPeopleTrending"
      sliderHeading="People"
    ></awesome-swiper>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AwesomeSwiper from "./AwesomeSwiper.vue";

export default {
  name: "Landing",
  components: {
    AwesomeSwiper
  },
  props: {},
  methods: {
    ...mapActions(["searchTrending"])
  },
  mounted() {
    this.searchTrending();
  },
  computed: {
    ...mapGetters(["getMovieTrending", "getTvTrending", "getPeopleTrending"])
  }
};
</script>

<style scoped>
#heading {
  text-align: center;
  /* background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      rgba(134, 29, 84, 1) 37%,
      rgb(255, 174, 174) 50%,
      rgba(134, 29, 84, 1) 63%,
      rgba(0, 0, 0, 0) 100%
    )
    center bottom no-repeat;
  background-size: 20% 1px; */
}
</style>
