<template>
  <div class="discover router-view">
    <section class="container py-5 justify-content-center">
      <div class="row" id="heading">
        <h1 class="py-3">
          {{ $route.name }}
        </h1>
      </div>
      <div class="row filters-row align-items-center py-4">
        <div>
          <button
            @click="movieOrTv = 'movie'"
            class="media-btn btn-lg mr-1"
            :class="{ activeToggle: movieOrTv == 'movie' }"
          >
            <span>Movie</span>
          </button>
          <button
            @click="movieOrTv = 'tv'"
            class="media-btn btn-lg ml-1"
            :class="{ activeToggle: movieOrTv == 'tv' }"
          >
            <span>Tv</span>
          </button>
        </div>
        <div class="row filters-row-right align-items-center">
          <p><i class="fas fa-filter"></i></p>
          <div v-if="selectedGenres > 0" class="col-11 col-md-5">
            <v-select
              multiple
              v-model="selectedGenres"
              :options="genreChoices"
            />
          </div>
          <div class="col-11 col-md-4 col-lg-5">
            <select
              @change="onSort"
              v-model="sort_input"
              class="input"
              id="sort"
            >
              <option disabled value="">Sort By</option>
              <option v-for="option in sort_options" :key="option">{{
                option
              }}</option>
            </select>
          </div>
          <form
            @submit.prevent="onSubmitYear"
            class="col-11 col-sm-3 col-md-2 col-lg-2"
          >
            <input v-model="year" class="input" id="year" placeholder=" Year" />
          </form>
        </div>
        <!-- <div class="col-11 col-md-4 col-lg-1">
                <input @submit.prevent="onSubmit" v-model="year" class="input" id="year" placeholder="Year">
              </div>
              <div class="col-11 col-md-4 col-lg-1">
                <input @submit.prevent="onSubmit" v-model="Duration" class="input" id="Duration" placeholder="Duration">
              </div>
              <div class="col-11 col-md-4 col-lg-1">
                <input @submit.prevent="onSubmit" v-model="year" class="input" id="year" placeholder="Year">
              </div> -->
      </div>
      <div class="row page-btn-row align-items-center py-4 top-border">
        <button @click="prevPage" class="page-btn">
          <span> <i class="fas fa-caret-left"></i> Prev </span>
        </button>
        <span>Page {{ this.page }}</span>

        <button @click="nextPage" class="page-btn">
          <span> Next <i class="fas fa-caret-right"></i> </span>
        </button>
      </div>
      <div class="row justify-content-center py-4">
        <div
          v-for="item in getDiscoverItems"
          :key="item.id"
          style="flex-shrink: 0; height: 100%; position: relative;"
        >
          <item
            :mediaItem="item"
            :discoverMediaTypeProp="movieOrTv"
            style="margin-right: 10px"
          ></item>
        </div>
      </div>
      <div class="row page-btn-row align-items-center py-4">
        <button @click="prevPage" class="page-btn btn-lg mr-1">
          <span> <i class="fas fa-caret-left"></i> Prev </span>
        </button>
        <span>Page {{ this.page }}</span>
        <button @click="nextPage" class="page-btn btn-lg ml-1">
          <span> Next <i class="fas fa-caret-right"></i> </span>
        </button>
      </div>
      <!-- <item-carousel :mediaItems="getDiscoverItems"></item-carousel> -->
    </section>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import vSelect from "vue-select";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SearchResults",
  components: {
    Item,
    vSelect
  },
  data() {
    return {
      sort_by: "popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc".split(
        ", "
      ),
      sort_options: "Least Popular, Most Popular, Oldest, To Be Released, Lowest Revenue, Highest Revenue, Reverse Alphabet, Alphabet, Worst Rated, Highest Rated, Least Voted On, Most Voted On".split(
        ", "
      ),
      sort_input: "Most Voted On",
      year: null,
      page: 1,
      movieOrTv: "movie",
      selectedGenres: []
    };
  },
  props: {},
  mounted() {
    this.requestItems();
    console.log("Discover items: ", this.getDiscoverItems);
  },
  methods: {
    ...mapActions(["discoverTMDB"]),
    requestItems() {
      this.discoverTMDB({
        media_type: this.movieOrTv,
        query: this.query,
        page: this.page,
        year: this.year
      });
    },
    onSort() {
      this.page = 1;
      this.requestItems();
      this.$router.push({
        name: "Discover",
        params: { sort: "multi", data: this.query }
      });
    },
    onSubmitYear() {
      this.requestItems();
      this.$router.push({
        name: "Discover",
        params: { sort: "multi", data: this.query }
      });
    },
    prevPage() {
      --this.page;
      if (this.page <= 0) this.page = 1;
      this.requestItems();
    },
    nextPage() {
      ++this.page;
      this.requestItems();
    }
  },
  computed: {
    ...mapGetters(["getDiscoverItems", "getMovieGenres", "getTvGenres"]),
    query: function() {
      return this.sortValue;
    },
    sortValue: function() {
      let index = this.sort_options.indexOf(this.sort_input);
      return this.sort_by[index];
    },
    genreChoices() {
      return this.movieOrTv == "movie"
        ? Object.values(this.getMovieGenres)
        : Object.values(this.getTvGenres);
    }
  },
  watch: {
    movieOrTv() {
      this.requestItems();
    }
  }
};
</script>

<style lang="scss" scoped>
.top-border {
  background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      #0f4557 07%,
      #42b983 45%,
      #caebdc 50%,
      #42b983 55%,
      #0f4557 93%,
      rgba(0, 0, 0, 0) 100%
    )
    center top no-repeat;
  background-size: 100% 1px;
}
.input {
  width: 100%;
  height: 44px;
  background-color: #0f495c;
  color: white;
  border-radius: 3px;
  border: none;
}
.input::placeholder {
  color: white;
}
.media-btn {
  color: white;
  background: #0f495c;
  border-radius: 10px;
  border: none;
}
.page-btn-row {
  justify-content: space-between;
}
.page-btn {
  color: white;
  background: #0f495c;
  border-radius: 10px;
  border: none;

  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
}
.activeToggle {
  border: 2px solid #42b983;
}
.filters-row {
  justify-content: space-between;
}
.filters-row-right {
  justify-content: end;
}
#heading {
  justify-content: center;
}
.fa-filter {
  color: #0f495c;
}
@media only screen and (max-width: 768px) {
  .filters-row {
    justify-content: center;

    > * > * {
      margin-bottom: 10px;
    }
  }
  .filters-row-right {
    justify-content: center;
  }
}
@media only screen and (max-width: 576px) {
  .page-btn-row {
    justify-content: space-around;
  }
  .page-btn {
    padding: 0.5rem 0.5rem;
    font-size: 1rem;
    line-height: 1;
  }
}

/* class in item.vue */
.mediaItem__wrapper {
  width: 150px;
}
</style>
