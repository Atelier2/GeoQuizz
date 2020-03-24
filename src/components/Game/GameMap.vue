<template>
    <l-map id="map" @click="addMarker" ref="map" :zoom="serie.zoom" :center="center">
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
        props:["serie"],
        components: {
            LMap,
            LTileLayer,
            LMarker,
        },
        data(){
            return{
                loopLoadMap:null,
            }
        },
        mounted() {
            this.loopLoadMap = setInterval( () => {
                this.$refs.map.mapObject.invalidateSize();
            }, 100);
        },
        beforeDestroy() {
            clearInterval(this.loopLoadMap)
            this.$bus.$off();
        },
        data(){
            return{
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                center: latLng(this.serie.latitude, this.serie.longitude),
                icon: L.icon({
                    iconUrl: require('leaflet/dist/images/marker-icon.png'),
                    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
                    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png')
                })
            }
        },
        methods:{
            addMarker(e){
                if(this.$store.state.progressGame.picturesPlaced < this.serie.nb_pictures){
                    new L.marker(e.latlng, { icon : this.icon }).addTo(this.$refs.map.mapObject);
                    this.$bus.$emit('calculScore', this.$store.state.progressGame.picturesPlaced, e.latlng);
                    this.$store.commit("progressGamePlacePicture")
                    if(this.$store.state.progressGame.picturesPlaced === this.serie.nb_pictures){
                        this.$bus.$emit("stopGame");
                    }
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