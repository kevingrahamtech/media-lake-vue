<template>
    <div class="discover router-view">
    <section class="container py-5">
      <div id="heading">
        <h1 class="py-3">
          {{$route.name}}
        </h1>
      </div>
          <div class="row justify-content-center py-4">
              <div class="col-11 col-md-4 col-lg-2">
                <select @change="onChange" v-model="sort_input" class="input" id="sort">
                  <option disabled value="">Sort By</option>
                  <option v-for="option in sort_options" :key="option">{{option}}</option>
                </select>
              </div>
              <div class="col-11 col-md-4 col-lg-1">
                <input @submit.prevent="onSubmit" v-model="year" class="input" id="year" placeholder="Year">
              </div>
        </div>
        <div class="row py-4">
            <div v-for="item in getDiscoverItems" :key="item.id" class="col-6 col-md-3 col-lg-2">
                <item :mediaItem="item"></item>
            </div>
        </div>
          <div class="row justify-content-center py-4">
              <div class="col-11 col-md-4 col-lg-3">
                <button @click="prevPage" class="btn-lg btn-primary mr-1">
                  <span>
                    <i class="fas fa-caret-left"></i> Prev
                  </span>
                </button>
                <button @click="nextPage" class="btn-lg btn-primary ml-1">
                  <span>
                    Next <i class="fas fa-caret-right"></i>
                  </span>
                </button>
              </div>
        </div>
      <!-- <item-carousel :mediaItems="getDiscoverItems"></item-carousel> -->
    </section>
    </div>
</template>

<script>
import Item from '@/components/Item.vue';
import { mapGetters, mapActions } from "vuex";

export default {
    name: "SearchResults",
    components: {
        Item
    },
    data() {
        return {
          sort_by: "popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc".split(', '),
          sort_options: "Least Popular, Most Popular, Oldest, To Be Released, Lowest Revenue, Highest Revenue, Reverse Alphabet, Alphabet, Worst Rated, Highest Rated, Least Voted On, Most Voted On".split(', '),
          sort_input: "Most Voted On",
          year: null,
          page: 1,
        }
    },
    props: {
        
    },
    mounted(){
      this.discoverTMDB({query: this.sortValue, page: 1})
    },
    methods: {
        ...mapActions(["discoverTMDB"]),
        onChange() {
            this.discoverTMDB({query: this.query, page: 1})
            this.$router.push({ name: 'Discover', params: {sort: "multi", data: this.query} })
        },
        onSubmit() {
            this.discoverTMDB({query: this.query, year: "&year="+this.year, page: 1})
        },
        prevPage(){
          --this.page;
          if(this.page <= 0) this.page = 1;
          this.discoverTMDB({query: this.query, page: this.page})
        },
        nextPage(){
          ++this.page
          this.discoverTMDB({query: this.query, page: this.page})
        }
    },
    computed: {
    ...mapGetters([ 'getDiscoverItems']),
      query: function(){
        return this.sortValue
      },
      sortValue: function(){
        let index = this.sort_options.indexOf(this.sort_input)
        return this.sort_by[index]
      }

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
.input{
  width: 100%;
}
</style>