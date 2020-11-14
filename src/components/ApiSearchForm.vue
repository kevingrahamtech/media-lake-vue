<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="row justify-content-center">
                <!-- <div class="col-12 col-md-6">
                    <label id="form-label" for="search-input">The Movie Database</label>
                </div> -->
                <div class="col-12 col-md-10 col-lg-7">
                    <input id="search-input" type="text" v-model="search" placeholder="Search content" />
                </div>
            </div>
        </form>
        <!-- <b-input-group size="lg">
            <b-input-group-prepend is-text>
                <b-iconstack font-scale="2" variant="secondary">
                    <b-icon stacked icon="search" font-scale="1"></b-icon>
                    <b-icon stacked icon="circle"></b-icon>
                </b-iconstack>
            </b-input-group-prepend>
            <b-form-input @submit.prevent="onSubmit" id="search-input" type="text" v-model="search" placeholder="Search creators, videos and more!"></b-form-input>
        </b-input-group> -->
    </div>
</template>

<script>
/* import { BIconstack, BIcon } from 'bootstrap-vue' */
import { mapActions } from "vuex";

export default {
    /*components: {
        BIcon,
        BIconstack
    },*/
    methods: {
        ...mapActions({ searchTMDB: "searchTMDB"}),
        onSubmit() {
            if(this.search === "") {
                return
            }
            this.searchTMDB({searchTerm: this.search})
            // this.searchTMDB(this.search)
            this.$router.push({ name: 'SearchResults', params: {type: "multi", data: this.search} })
            this.search = "";
        },
    //     searchTMDB: function (searchTerm) {
    //         this.$http.get(this.$store.state.baseURI + this.$store.state.endpoint.multiSearch + this.$store.state.keyPref+this.$store.state.apiV3Key + "&language=en-US&query=" + searchTerm + "&page=1&include_adult=false")
    //         .then((response) => {
    //         const items = response.data.results.filter(item => item.poster_path != null)
    //         console.log(items);
    //         var movies = items.filter(item => item.media_type.includes("movie"))
    //         this.$store.commit('updateMovieItems', {data: movies})
    //         var tv = items.filter(item => item.media_type.includes("tv"))
    //         this.$store.commit('updateTvItems', {data: tv})
    //         var persons = items.filter(item => item.media_type.includes("person"))
    //         this.$store.commit('updatePersonItems', {data: persons})
    //         console.log("movieItems: ", this.$store.state.movieItems);
    //     })
    // }
    },
    data() {
        return {
            search: ""
        };
    }
}
</script>

<style scoped>
input::placeholder {
  color: rgb(150, 150, 150);
  font-size: 1.2em;
  }
#search-input {
    text-indent: 10px;
    height: 3.5rem;
    width: 100%;
    border-width: 2px;
    border-inline-color: green;
    border-style: solid;
    border-block-color: green;
    color: black;
    border-radius: 20pt;
    text-align: left;
    background: #ffffff9d;
}
</style>