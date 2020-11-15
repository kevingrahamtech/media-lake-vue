<template>
    <div class="router-view">
    <section class="container py-5">
        <h1 class="py-5">
            Results For '{{$route.params.data}}'
        </h1>
      <item-carousel :mediaItems="movieItems"></item-carousel>
      <item-carousel :mediaItems="tvItems"></item-carousel>
      <item-carousel :mediaItems="personItems"></item-carousel>
    </section>
    </div>
</template>

<script>
import ItemCarousel from '@/components/ItemCarousel.vue';
import { mapGetters } from "vuex";

export default {
    name: "SearchResults",
    components: {
        ItemCarousel
    },
    data() {
        return {
        }
    },
    props: {
        
    },
    methods: {

    },
    computed: {
    ...mapGetters({ 
        movieItems: 'getMovieItems',
        tvItems: 'getTvItems',
        personItems: 'getPersonItems',
    })
    }

}
</script>