<template>
    <section class="container py-5">
      <item-carousel :mediaItems="getTrending('movie')"></item-carousel>
      <item-carousel :mediaItems="getTrending('tv')"></item-carousel>
      <item-carousel :mediaItems="getTrending('person')"></item-carousel>
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
        ...mapGetters(['getTrending']),
        // trendingmovie: this.getTrending(movie)
    }

}
</script>