<template>
    <l-map id="map" @click="addMarker" ref="map" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"/>
    </l-map>
</template>

<script>
    import { latLng } from "leaflet";
    import L from "leaflet"
    import D from "leaflet-geometryutil"
    import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
    import 'leaflet/dist/leaflet.css';

    export default {
        name: "GameMap",
        props:["nb_pictures","zoom"],
        components: {
            LMap,
            LTileLayer,
            LMarker,
        },
        data(){
            return{
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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
                    this.calculScore(this.$store.state.progressGame.picturesPlaced, e.latlng,)
                    this.$store.commit("progressGamePlacePicture")
                }
                else{
                    this.$root.makeToast("La partie est terminée.");
                }
            },
            calculScore(numPicture, posMarker){
                let distance_metters = this.calculDistanceMetters(numPicture, posMarker);
                console.log(distance_metters);
            },
            calculDistanceMetters(numPicture, posMarker){
                let lat_picture = this.$store.state.progressGame.pictures[this.$store.state.progressGame.picturesPlaced].latitude;
                let lng_picture = this.$store.state.progressGame.pictures[this.$store.state.progressGame.picturesPlaced].longitude;
                let lat_lng_picture = latLng(lat_picture,lng_picture);

                return L.GeometryUtil.length([lat_lng_picture,posMarker])
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