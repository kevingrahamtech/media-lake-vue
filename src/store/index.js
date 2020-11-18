import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";


Vue.use(Vuex);


const baseURI= "https://api.themoviedb.org/3";
const keyPref= "?api_key=";
const apiV3Key= "a6817d1e66ed3d6719d7f43eb77d2969";
const endpoint = {
  configuration: "/configuration",
  genres: "/genre/movie/list",
  details: {movie: "/movie/", tv: "/tv/",append:"&append_to_response="},
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
    TrendingItems: null,
    MovieTrending: [],
    TvTrending: [],
    PersonTrending: [],
    movieItems: null,
    tvItems: null,
    personItems: null,
    searchTerm: null,
    details: null,
  },
  mutations: {
    updateApiConf(state, payload) {
      state.ApiConf = payload.data;
    },
    updateGenreList(state, payload) {
      state.GenreList = payload.data;
    },
    updateTrendingItems(state, payload) {
      state.TrendingItems = payload.data;
    },
    updateMovieTrending(state, payload) {
      state.MovieTrending = payload.data;
    },
    updateTvTrending(state, payload) {
      state.TvTrending = payload.data;
    },
    updatePersonTrending(state, payload) {
      state.PersonTrending = payload.data;
    },
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
    updateDetails(state, payload) {
      state.details = payload.data;
    }
  },
  actions: {
    reqConfs: function ({ commit }) {
      Axios.get(baseURI + endpoint.configuration + keyPref + apiV3Key)
      .then((response) => {
        let confs = response.data.images
        console.log("apiConfigs: ", confs)
        commit('updateApiConf', {data: confs})
      })
      Axios.get(baseURI + endpoint.genres + keyPref + apiV3Key)
      .then((response) => {
        let genres = response
        console.log("genreList: ", genres)
        commit('updateGenreList', {data: genres})
      })
    },
    reqDetails({ commit }, payload) {
      // let resultObj = {};
      Axios.get(baseURI + endpoint.details.movie + payload.id + keyPref+apiV3Key)
      .then((response) => {
        let details = response.data
        console.log(details)
        commit('updateDetails', {data: details})
      })
    },
    searchTrending({ commit }) {
      // let resultObj = {};
      Axios.get(baseURI + endpoint.trending.movie + keyPref+apiV3Key)
      .then((response) => {
        let movies = response.data.results
        // resultObj[movies] = movies
        // // console.log(media);
        // // commit('updateMovieTrending', {data: media})
        commit('updateMovieTrending', {data: movies})
      })
      Axios.get(baseURI + endpoint.trending.tv + keyPref+apiV3Key)
      .then((response) => {
        let tv = response.data.results
        // resultObj[tv] = tv
        // console.log(media);
        commit('updateTvTrending', {data: tv})
      })
      Axios.get(baseURI + endpoint.trending.person + keyPref+apiV3Key)
      .then((response) => {
        let persons = response.data.results.filter(item => item.profile_path != null)
        // resultObj[persons] = persons
        // console.log(media);
        commit('updatePersonTrending', {data: persons})
      })

      // commit('updateTrendingItems', {data: resultObj})
    },
    searchTMDB({ commit, state }, payload) {
      Axios.get(baseURI + endpoint.multiSearch + keyPref+apiV3Key + "&language=en-US&query=" + payload.searchTerm + "&page=1&include_adult=false")
      .then((response) => {
        const items = response.data.results.filter(item => item.poster_path != null)
        console.log(items);
        var movies = items.filter(item => item.media_type.includes("movie"))
        commit('updateMovieItems', {data: movies})
        var tv = items.filter(item => item.media_type.includes("tv"))
        commit('updateTvItems', {data: tv})
        var persons = items.filter(item => item.media_type.includes("person"))
        commit('updatePersonItems', {data: persons})
        console.log("movieItems: ", state.movieItems);
      })
    }
  },
  modules: {},
  getters: {
    getApiConf: state => state.ApiConf,
    getGenreList: state => state.GenreList,
    getTrending: (state) => (mediaType) => {
      return state.TrendingItems
        .filter(item => item.media_type === mediaType)
    },
    getDetails: state => state.details,
    getMovieTrending: state => state.MovieTrending,
    getTvTrending: state => state.TvTrending,
    getPersonTrending: state => state.PersonTrending,
    getMovieItems: state => state.movieItems,
    getTvItems: state => state.tvItems,
    getPersonItems: state => state.personItems,
  }
});
