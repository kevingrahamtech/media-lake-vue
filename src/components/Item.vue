<template>
    <div class="mediaItem__wrapper">
        <router-link :to="{ name: 'ItemDetail', params: {media_type: this.mediaItem.media_type, id: this.mediaItem.id} }">
            <div>
                <img :src="this.imageURI + this.imsize + mediaItem.poster_path" :title="mediaItem.release_date">
            </div>
            <h4 v-html="mediaItem.original_title"></h4>
            <p v-html="mediaItem.vote_average"></p>
        </router-link>
    </div>
</template>
<script>
export default {
    props: ['mediaItem'],
    computed: {
        poster: function(){
            const baseURI = "";
            var posterUrl = baseURI + this.mediaItem.poster_path
            return {
                posterUrl
            }
        }
    },
    methods: {

    },
    data() {
        return {
            imageURI: "https://image.tmdb.org/t/p",
            imsize: "/w154"
        }
    }
}
</script>

<style scoped>
img {
    border-radius: 15px;
}

</style>