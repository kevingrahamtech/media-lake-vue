<template>
    <div class="row justify-content-center VideoRow-wrapper">
        <div v-for="item in mediaItems" :key="item.id" class="col-11 col-md-4 col-lg-3">
            <item :mediaItem="item"></item>
        </div>
            
    </div>
</template>
<script>
import Item from './Item.vue';

export default {
    components: {
        Item
    },
    props: ['mediaItems'],
    data: function() {
        return {

        }
    }
}
</script>