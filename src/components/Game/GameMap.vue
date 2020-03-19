<template>
    <l-map id="map" ref="map" :zoom="zoom" :minZoom="zoom" :center="center">
        <l-tile-layer
                :url="url"
        />
    </l-map>
</template>

<script>
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
    import 'leaflet/dist/leaflet.css';

    export default {
        name: "GameMap",
        components: {
            LMap,
            LTileLayer,
            LMarker,
        },
        data(){
            return{
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                zoom: 10,
                center: latLng(47.41322, -1.219482)
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.map.mapObject.dragging.disable();
            });
        }
    }
</script>

<style scoped>
    #map{
        height: 100vh;
    }
</style>