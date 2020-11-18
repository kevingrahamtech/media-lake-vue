<template>
    <div class="router-view container-fluid pb-5">
        <section class="row" id="hero">
            <img id="hero-image" :src="getApiConf.base_url + getApiConf.backdrop_sizes[3] + getDetails.backdrop_path" alt="getDetails.title">
            <div class="row" id="hero-banner">
                <div class="col-12 text-left">
                    <div>
                    <span id="title" class="px-4 py-2" style="font-size: 4vw;" title="title">{{getDetails.title}} <span id="runtime" title="runtime"><i class="far fa-clock"></i> {{runtime(getDetails.runtime)}}</span></span>
                    </div>
                </div>
                <div class="col-12 text-left mt-4 mr-3">
                    <span class="px-4 py-2 mr-3" id="year" :title="getDetails.release_date">{{getDetails.release_date.slice(0, -6)}}</span>                 
                        <span class="px-4 py-2" id="rating" title="average rating"><i class="fa fa-star"></i> {{getDetails.vote_average}}</span>
                    
                </div>
                <div class="col text-left mt-4">
                </div>
            </div>
        </section>
        <section class="row py-5 justify-content-center" id="details">
            <div class="col-11 col-md-8 col-lg-4 mx-2" id="card">
                <h2>Overview</h2>
                <span>{{getDetails.overview}}</span>
            </div>
            <div v-if="getDetails.revenue > 0" class="mx-2" id="card">
                <h2>Revenue</h2>
                <div id="revenue">${{numberWithCommas(getDetails.revenue)}}</div>
            </div>
        </section>
        <div class="container">
            <div class="row justify-content-around py-5" id="studios">
                <div v-for="company in getDetails.production_companies" :key="company.id" class="col-12 col-md-5 col-lg-3 pb-2 align-middle">
                    <img v-if="company.logo_path" id="logo" :src="getApiConf.base_url + getApiConf.logo_sizes[4] + company.logo_path" alt="">
                    <h3 v-else>{{company.name}}</h3>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "ItemDetail",
    props: {

    },
    data() {
        return {
        }
    },
    mounted() {
        this.reqDetails({id: this.$route.params.id});
    },
    computed: {
        ...mapGetters(['getDetails', 'getApiConf'])

    },
    methods: {
        ...mapActions(['reqDetails']),
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        runtime(time){
            if(!time) {
                return
            }
            else if(time > 60){
                    let hrs = Math.floor(time/60)
                    if(time%60 !== 0){
                       return hrs + ":" + time%60 ;
                    }
                    else {
                        return hrs + "hrs"
                    }
                
            }
            else if(time < 60) {
                return time+"mins";
            }
        }
    }
}
</script>

<style scoped>
#hero{
    position: relative;
}

    #hero-image {
        width: 100%;
        position: relative;
    }
    #hero-banner {
        font-size: 4vw;
        line-height: 1;
        color: rgb(216, 216, 216);
        position: absolute;
        top: 60%;
        left: 10%;
    }
#title{
    font-size: 4vw;
    background-color: rgba(0, 0, 0, 0.741);
}
#runtime{
    font-size: 1.5vw;
}
#year, #rating{
    font-size: 3vw;
    background-color: rgba(0, 0, 0, 0.741);
}

#details{
    color: #fff;
}
#card{
    background-color: rgba(67, 67, 67, 0.275);
    border-radius: 20pt;
    padding: 5rem;
}
#revenue{
    font-size: 4vw;
}
h2 {
    font-size: 3vw;
}
#logo{
    width: 100%;
}
#studios{
    color: black;
    background-color: #e6e6e6;
    border-radius: 20pt;
}
</style>