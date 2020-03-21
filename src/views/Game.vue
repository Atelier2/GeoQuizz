<template>
    <div class="game" v-if="serie">
                <GameDetails class="gameDetails" :serie="serie"></GameDetails>
                <GameMap :nb_pictures="serie.nb_pictures" :zoom="serie.zoom"></GameMap>
    </div>
</template>

<script>
    import GameMap from "../components/Game/GameMap";
    import GameDetails from "../components/Game/GameDetails";
    import L, {latLng} from "leaflet";
    export default {
        name: "Game",
        components: {GameDetails, GameMap},
        data(){
            return{
                serie:null
            }
        },
        beforeMount() {
            if(this.$store.state.game){
                //Verifier la valiter du token
                this.getSerieDetails();
            }
            else{
                this.$router.push("/Home")
            }
        },
        mounted() {
            this.$bus.$on('calculScore',(numPicture, posMarker) => {
                this.calculScore(numPicture, posMarker);
            })
        },
        methods:{
            getSerieDetails(){
                this.$axios.get('series/'+ this.$store.state.game.id_series).then((response) => {
                    this.serie = response.data.series
                    console.log("Chargement de la série réussie");
                }).catch((e) => {
                    console.log("Erreur lors du chargement de la série");
                    this.$root.makeToast(e.response.data.message);
                    this.$store.commit("resetGame");
                    this.$router.push("/Home")
                })
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

<style scoped lang="scss">
    @media (max-width: 991.98px) {
        .game{
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
    }
    @media (min-width: 991.98px) {
        .game{
            display: flex;
            flex-direction: row;
            height: 100vh;
        }
    }
    .gameDetails{
        flex-basis: 40%;
    }
</style>