<template>
  <div class="mediaItem__wrapper pb-4">
    <router-link
      :to="{
        name: 'ItemDetail',
        params: {
          media_type: this.mediaItem.media_type || this.discoverMediaTypeProp,
          id: this.mediaItem.id
        }
      }"
    >
      <div class="poster pb-3">
        <img
          :src="
            getApiConf.images.secure_base_url +
              getApiConf.images.poster_sizes[1] +
              (mediaItem.poster_path || mediaItem.profile_path)
          "
          :title="mediaItem.release_date || mediaItem.first_air_date"
        />
        <span
          v-if="mediaItem.vote_average"
          class="px-1"
          id="rating"
          style="color: lightgrey;"
          ><i class="fa fa-star"></i>
          {{ mediaItem.vote_average }}
        </span>
      </div>
      <div class="text-left swiper-slide__title">
        <span id="title" v-html="mediaItem.title || mediaItem.name"></span>
      </div>
      <div>
        <!-- <span id="genre" v-for="genre in itemGenreNameList" :key="genre" :class="index &gt; 0 ? 'secondary' : ''">{{ genre }}</span> -->
        <!-- <span id="genre" v-for="genre in itemGenres(mediaItem.genre_ids)" :key="genre" >{{ genre }}</span> -->
      </div>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["mediaItem", "discoverMediaTypeProp"],
  computed: {
    ...mapGetters(["getApiConf", "getGenreList"])
  },
  mounted() {},
  methods: {
    itemGenres(idsArray) {
      return idsArray.map(function(genreId) {
        return this.getGenreList[genreId];
      });
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.mediaItem__wrapper {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
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
  font-family: Metropolis-Bold;
}
#genre {
  float: left;
}
@media only screen and (max-width: 100px) {
  img {
    width: 30px;
  }
}
</style>
