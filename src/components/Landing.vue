<template>
    <section class="container py-5">
      <item-carousel :mediaItems="getMovieTrending"></item-carousel>
      <item-carousel :mediaItems="getTvTrending"></item-carousel>
      <item-carousel :mediaItems="getPersonTrending"></item-carousel>
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
        ...mapGetters(['getTrending', 'getMovieTrending', 'getTvTrending', 'getPersonTrending']),
        // trendingmovie: this.getTrending(movie)
    }

}
</script>