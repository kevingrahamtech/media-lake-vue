<template>
    <div class="mediaItem__wrapper">
        <router-link :to="{ name: 'ItemDetail', params: {media_type: this.mediaItem.media_type, id: this.mediaItem.id} }">
            <div class="poster pb-3">
                <img :src="getApiConf.base_url + getApiConf.poster_sizes[1] + (mediaItem.poster_path || mediaItem.profile_path)" :title="mediaItem.release_date">
                    <span v-if="mediaItem.vote_average" class="px-1" id="rating" ><i class="fa fa-star"></i> {{ mediaItem.vote_average }}
                </span>
            </div>
            <div class="text-left">
                <span id="title" v-html="mediaItem.title || mediaItem.name"></span>
            </div>
            <div>
                <!-- <span id="genre" v-for="genre in itemGenres(mediaItem.genre_ids)" :key="genre.id" :class="index &gt; 0 ? 'secondary' : ''">{{ genre.name }}</span> -->
                <span id="genre" v-for="{genre, index} in mediaItem.genre_ids" :key="genre" :class="index &gt; 0 ? 'secondary' : ''">{{ genre }}</span>
            </div>
        </router-link>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: ['mediaItem'],
    computed: {
        ...mapGetters(['getApiConf', {genreList: 'getGenreList'}]),
          genres: () => this.$store.state.GenreList,
    },
    methods: {
        itemGenres(item) {
            return item.map( genreId => this.genres[genreId])
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
.poster {
    position: relative;
}
img {
    border-radius: 15px;
}
#rating {
    position: absolute;
    top: 5%;
    left: 0;
    background-color: rgba(18, 41, 84, 0.576);
    border-radius: 0 3pt 3pt 0;
    font-size: 13px;
}
#title {
    line-height: 1;
    font-weight: bold;
    }
#genre {
    float: left;
}
</style>