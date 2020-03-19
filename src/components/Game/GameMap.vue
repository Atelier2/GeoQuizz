<template>
    <l-map id="map" ref="map" :zoom="zoom" :maxZoom="zoom" :minZoom="zoom" :center="center">
        <l-tile-layer :url="url"/>
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
                zoom: 12,
                center: latLng(47.41322, -1.219482)
            }
        }
    }
</script>

<style lang="scss" scoped>
    #map{
        height: 100%;
        width: 100%;
    }
</style>