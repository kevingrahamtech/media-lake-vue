<template>
  <div class="wrapper">
    <h2 class="swiper-container__title">{{ sliderHeading }}</h2>
    <swiper
      :options="swiperOption"
      ref="swiper"
      class="swiper"
      :class="{ top_border: topBorderProp }"
    >
      <!-- Loops through item data and creates a swiper slide -->

      <swiper-slide v-for="item in mediaItems" :key="item.id">
        <item :mediaItem="item"></item>
      </swiper-slide>

      <template v-slot:button-prev>
        <div
          @click="$refs.swiper.swiperInstance.slidePrev()"
          class="swiper-button-prev"
        ></div>
      </template>
      <template v-slot:button-next>
        <div
          @click="$refs.swiper.swiperInstance.slideNext()"
          class="swiper-button-next"
        ></div>
      </template>
    </swiper>
    <hr class="carousel-container__separator" />
  </div>
</template>

<script>
import Item from "./Item.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";

export default {
  name: "swiper-example-pagination-progress",
  title: "Progress pagination",
  components: {
    Item,
    Swiper,
    SwiperSlide
  },
  data() {
    return {};
  },
  props: {
    mediaItems: {
      type: Array,
      default: () => []
    },
    topBorderProp: Boolean,
    sliderHeading: String,
    slidesPerViewProp: Number,
    slidesPerGroup: Number,
    spaceBetweenProp: Number,
    centerInsufficientSlides: Boolean,
    numSlidesProp: Number
  },
  computed: {
    swiperOption() {
      return {
        slidesPerView: this.slidesPerViewProp || 7,
        slidesPerGroup: 7,
        spaceBetween: this.spaceBetweenProp || 10,
        simulateTouch: true,
        loop: true,
        centerInsufficientSlides: true,
        resizeObserver: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          // when window width is >= 0px
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 1
          },
          // when window width is >= 400px
          400: {
            slidesPerView: 3,
            slidesPerGroup: this.slidesPerViewProp || 3,
            spaceBetween: 0
          },
          780: {
            slidesPerView: this.slidesPerViewProp - 4 || 4,
            slidesPerGroup: this.slidesPerViewProp || 4,
            spaceBetween: this.spaceBetweenProp || 10
          },
          1000: {
            slidesPerView: this.slidesPerViewProp - 3 || 5,
            slidesPerGroup: this.slidesPerViewProp || 5,
            spaceBetween: this.spaceBetweenProp || 10
          },
          1220: {
            slidesPerView: this.slidesPerViewProp || 7,
            slidesPerGroup: this.slidesPerViewProp || 7,
            spaceBetween: this.spaceBetweenProp || 10
          }
        }
      };
    }
  }
};
</script>

<style scoped>
.swiper-button-prev {
  color: #42b983;
  font-size: 82px;
  background: linear-gradient(
      to right,
      rgba(185, 245, 190, 0.39) 0%,
      #42b98362 10%,
      #0f4557 63%,
      rgba(185, 245, 190, 0.39) 100%
    )
    left top no-repeat;
  border-radius: 65px;
  padding: 30px;
}
.swiper-button-next {
  color: #42b983;
  font-size: 82px;
  background: linear-gradient(
      to left,
      rgba(185, 245, 190, 0.39) 0%,
      #42b98362 10%,
      #0f4557 63%,
      rgba(185, 245, 190, 0.39) 100%
    )
    right top no-repeat;
  border-radius: 65px;
  padding: 30px;
}
.top_border {
  padding-top: 20px;
  background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      #42b983 10%,
      #0f4557 63%,
      rgba(0, 0, 0, 0) 100%
    )
    left top no-repeat;
  background-size: 90% 1px;
}
@media only screen and (max-width: 780px) {
  .top_border {
    background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0) 0%,
        #0f4557 37%,
        #42b983 50%,
        #0f4557 63%,
        rgba(0, 0, 0, 0) 100%
      )
      center top no-repeat;
    background-size: 90% 1px;
  }
}
</style>
