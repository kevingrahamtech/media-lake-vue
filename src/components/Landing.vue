<template>
    <section class="container py-5">
      <div id="heading">
        <h1 class="py-3">
          Trending
        </h1>
      </div>
      <item-carousel :mediaItems="getTrending['movies']" sliderHeading="Movies"></item-carousel>
      <item-carousel :mediaItems="getTrending['tv']" sliderHeading="Tv"></item-carousel>
      <item-carousel :mediaItems="getTrending['people']" sliderHeading="People"></item-carousel>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ItemCarousel from './ItemCarousel.vue';

export default {
    name: "Landing",
    components: {
        ItemCarousel
    },
    props: {},
    methods: {
        ...mapActions(['searchTrending'])
    },
    mounted(){
        this.searchTrending()
    },
    computed: {
        ...mapGetters(['getTrending', 'getMovieTrending', 'getTvTrending', 'getPeopleTrending']),
    }

}
</script>

<style scoped>
#heading{
  background: /* gradient can be an image */
    linear-gradient(
      to left, 
      rgba(0, 0, 0, 0) 0%,
      rgba(134,29,84,1) 37%,
      rgb(255, 174, 174) 50%,
      rgba(134,29,84,1) 63%,
      rgba(0, 0, 0, 0) 100%
    )
    center 
    bottom
    no-repeat; 
  background-size:20% 1px ;
}
</style>