<template>
    <l-map id="map" @click="addMarker" ref="map" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"/>
    </l-map>
</template>

<script>
    import { latLng } from "leaflet";
    import L from "leaflet"
    import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
    import 'leaflet/dist/leaflet.css';

    export default {
        name: "GameMap",
        props:["nb_pictures"],
        components: {
            LMap,
            LTileLayer,
            LMarker,
        },
        data(){
            return{
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                zoom: 12,
                center: latLng(47.41322, -1.219482),
                icon: L.icon({
                    iconUrl: require('leaflet/dist/images/marker-icon.png'),
                    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
                    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png')
                })
            }
        },
        methods:{
            addMarker(e){
                if(this.$store.state.progressGame.picturesPlaced < this.nb_pictures){
                    new L.marker(e.latlng, { icon : this.icon }).addTo(this.$refs.map.mapObject);
                    this.$store.commit("prograssGamePlacePictture")
                }
                else{
                    this.$root.makeToast("La partie est terminée.");
                }
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