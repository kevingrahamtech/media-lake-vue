<template>
  <div class="router-view">
    <section class="container py-5">
      <h1 class="py-5">Results For '{{ $route.params.data }}'</h1>
      <awesome-swiper
        :mediaItems="movieItems"
        sliderHeading="Movies"
      ></awesome-swiper>
      <awesome-swiper :mediaItems="tvItems" sliderHeading="Tv"></awesome-swiper>
      <awesome-swiper
        :mediaItems="personItems"
        sliderHeading="People"
      ></awesome-swiper>
    </section>
  </div>
</template>

<script>
import AwesomeSwiper from "@/components/AwesomeSwiper.vue";
import { mapGetters } from "vuex";

export default {
  name: "SearchResults",
  components: {
    AwesomeSwiper
  },
  data() {
    return {};
  },
  props: {},
  methods: {},
  computed: {
    ...mapGetters("search", {
      movieItems: "getMovieItems",
      tvItems: "getTvItems",
      personItems: "getPersonItems"
    })
  }
};
</script>
