<template>
    <div class="game" v-if="serie">
                <GameDetails class="gameDetails" :serie="serie" :chrono="time" :gameStarted="gameStarted"></GameDetails>
                <GameMap :nb_pictures="serie.nb_pictures" :zoom="serie.zoom" v-show="gameStarted"></GameMap>
                <start-page v-show="!gameStarted"></start-page>
    </div>
</template>

<script>
    import GameMap from "../components/Game/GameMap";
    import GameDetails from "../components/Game/GameDetails";
    import L, {latLng} from "leaflet";
    import StartPage from "../components/Game/startPage";
    export default {
        name: "Game",
        components: {StartPage, GameDetails, GameMap},
        data(){
            return{
                gameStarted:false,
                serie:null,
                time: {
                    minutes: 0,
                    secondes: 0
                },
                totalSecondes: 0,
                timer:null
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
            this.$bus.$on('startChrono',() => {
                this.startChrono();
            })
            this.$bus.$on('calculScore',(numPicture, posMarker) => {
                this.calculScore(numPicture, posMarker);
            })
            this.$bus.$on('startGame',() => {
                this.startGame()
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
            startGame(){
                this.$axios.put('games/'+ this.$store.state.game.id,{
                    "id_status":1
                },{
                    headers: {Authorization: 'Bearer ' + this.$store.state.game.token}
                }).then((response) => {
                    console.log("Démarrage de la partie réussie")
                    this.gameStarted = true;
                    this.startChrono();
                }).catch((e) => {
                    console.log("Erreur lors du démarrage de la partie");
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
            },
            startChrono(){
                this.timer = setInterval(() =>  {
                    this.time.minutes = Math.floor(++this.totalSecondes / 60);
                    this.time.secondes = this.totalSecondes - this.time.minutes * 60;
                }, 1000);
            },
            stopChrono(){
                clearInterval(this.timer);
            },
            resetChrono(){
                chronoReset = function() {
                    this.totalSecondes = 0;
                    this.time.minutes = 0;
                    this.time.secondes = 0;
                }
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