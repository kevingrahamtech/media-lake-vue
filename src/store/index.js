import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";


Vue.use(Vuex);


const baseURI= "https://api.themoviedb.org/3";
const keyPref= "?api_key=";
const apiV3Key= "a6817d1e66ed3d6719d7f43eb77d2969";
const endpoint = {
  configuration: "/configuration",
  genres: {movie:"/genre/movie/list", tv:"/genre/tv/list"},
  discover: {
    movie: "/discover/movie",
    tv: "/discover/tv"
  },
  movie: "/movie/", 
  tv: "/tv/",
  details: {append:"&append_to_response="},
  reviews: "/reviews",
  trending: {
    all: "/trending/all/day",
    movie: "/trending/movie/day",
    tv: "/trending/tv/day",
    person:"/trending/person/day"},
  multiSearch: "/search/multi"
};

export default new Vuex.Store({
  state: {
    ApiConf: [],
    GenreList: null,
    TrendingItems: [],
    DiscoverItems: null,
    details: [],
    Reviews: [],
  },
  mutations: {
    updateApiConf(state, payload) {
      state.ApiConf = payload.data;
    },
    updateGenreList(state, payload) {
      state.GenreList = payload.data;
    },
    updateDiscoverItems(state, payload) {
      state.DiscoverItems = payload.data;
    },
    updateMovieTrending(state, payload) {
      // let obj = {};
      // obj["movies"] = payload.data;
      // state.TrendingItems.movies.push(obj);
      state.TrendingItems.movies = payload.data;
    },
    updateTvTrending(state, payload) {
      // let obj = {};
      // obj["tv"] = payload.data;
      // state.TrendingItems.push(obj);
      state.TrendingItems.tv = payload.data;
    },
    updatePersonTrending(state, payload) {
      // let obj = {};
      // obj["people"] = payload.data;
      // state.TrendingItems.push(obj);
      state.TrendingItems.people = payload.data;
    },
    updateDetails(state, payload) {
      state.details = payload.data;
    },
    updateReviews(state, payload) {
      state.Reviews = payload.data;
    },
    updateTvDetails(state, payload) {
      state.details = payload.data;
    },
  },
  actions: {
    reqConfs: function ({ commit }) {
      Axios.get(baseURI + endpoint.configuration + keyPref + apiV3Key)
      .then((response) => {
        let images = response.data.images
        let change_keys = response.data.change_keys
        let confs = {}
        confs["images"] = images
        confs["change_keys"] = change_keys
        console.log("apiConfigs: ", confs)
        commit('updateApiConf', {data: confs})
      })
      Axios.get(baseURI + endpoint.genres.movie + keyPref + apiV3Key)
      .then((response) => {
        let genres = response.data.genres
        var genresReduced = genres.reduce(function(result, currentObject) {
          result[currentObject.id] = currentObject.name;
          return result;
        }, {});
        // console.log("genresReduced: ", genresReduced)
        commit('updateGenreList', {data: genresReduced})
      })
    },
    reqDetails({ commit }, payload) {
      Axios.get(baseURI + endpoint[payload.media_type] + payload.id + keyPref+apiV3Key)
      .then((response) => {
        let details = response.data
        console.log("details: ", details)
        commit('updateDetails', {data: details})
        // if (payload.media_type == "movie") {
        //   commit('updateMovieDetails', {data: details})
        // }
        // else if (payload.media_type == "tv") {
        //   commit('updateTvDetails', {data: details})
        // }      
      })

      
      fetch(baseURI + endpoint[payload.media_type] + payload.id + endpoint.reviews + keyPref+apiV3Key)
        .then(function(response){
          return response.json()
        })
        .then((data) => {
          let reviews = data.results
          console.log("reviews: ", reviews)
          commit('updateReviews', {data: reviews})
        })
        .catch(function(error){
          console.log("Reviews request failed", error)
        })
    },
    searchTrending({ commit }) {
      Axios.get(baseURI + endpoint.trending.movie + keyPref+apiV3Key)
      .then((response) => {
        let movies = response.data.results
        commit('updateMovieTrending', {data: movies})
      })
      Axios.get(baseURI + endpoint.trending.tv + keyPref+apiV3Key)
      .then((response) => {
        let tv = response.data.results
        commit('updateTvTrending', {data: tv})
      })
      Axios.get(baseURI + endpoint.trending.person + keyPref+apiV3Key)
      .then((response) => {
        let persons = response.data.results.filter(item => item.profile_path != null)
        commit('updatePersonTrending', {data: persons})
      })
    },
    discoverTMDB({ commit }, payload) {
      Axios.get(baseURI + endpoint.discover.movie + keyPref+apiV3Key + "&language=en-US" + "&sort_by=" + payload.query + "&include_adult=false&include_video=false&page=" + payload.page)
      .then((response) => {
        const items = response.data.results.filter(item => item.poster_path != null)
        // console.log("discover items: ", items);
        commit('updateDiscoverItems', {data: items})
      })
    }
  },
  getters: {
    getApiConf: state => state.ApiConf,
    getGenreList: state => state.GenreList,
    getTrending: state => state.TrendingItems,
    getDiscoverItems: state => state.DiscoverItems,
    getDetails: state => state.details,
    getReviews: state => state.Reviews,
    getMovieTrending: state => state.TrendingItems.movies,
    getTvTrending: state => state.TrendingItems.tv,
    getPeopleTrending: state => state.TrendingItems.people,

  },
  modules: {
    search: {
      namespaced: true,
      // module assets
      state: () => ({     
        movieItems: null,
        tvItems: null,
        personItems: null,
        searchTerm: null, 
      }), // module state is already nested and not affected by namespace option
      getters: {
        getMovieItems: state => state.movieItems,
        getTvItems: state => state.tvItems,
        getPersonItems: state => state.personItems,
      },
      actions: {
        searchTMDB({ commit, state }, payload) {
          Axios.get(baseURI + endpoint.multiSearch + keyPref+apiV3Key + "&language=en-US&query=" + payload.searchTerm + "&page=1&include_adult=false")
          .then((response) => {
            const items = response.data.results.filter(item => item.poster_path != null || item.profile_path != null)
            console.log(items);
            var movies = items.filter(item => item.media_type.includes("movie"))
            commit('updateMovieItems', {data: movies})
            var tv = items.filter(item => item.media_type.includes("tv"))
            commit('updateTvItems', {data: tv})
            var persons = items.filter(item => item.media_type.includes("person"))
            commit('updatePersonItems', {data: persons})
            console.log("movieItems: ", state.movieItems);
          })
        }, // -> dispatch('search/TMDB')
      },
      mutations: {
        updateMovieItems(state, payload) {
          state.movieItems = payload.data;
        },
        updateTvItems(state, payload) {
          state.tvItems = payload.data;
        },
        updatePersonItems(state, payload) {
          state.personItems = payload.data;
        },
        updateSearchTerm(state, payload) {
          state.SearchTerm = payload.data;
        },
      },

    },
  }
});
