<template>
    <div class="game" v-if="serie">
                <GameDetails class="gameDetails" :serie="serie" :chrono="time" :gameStarted="gameStarted"></GameDetails>
                <GameMap :nb_pictures="serie.nb_pictures" :zoom="serie.zoom" v-show="gameStarted === 1"></GameMap>
                <start-page v-show="gameStarted === 0"></start-page>
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
                // 0 non commencé 1 démarrer 2 fini
                gameStarted:0,
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
            this.$bus.$on('calculScore',(numPicture, posMarker) => {
                this.resetChrono();
                this.calculScore(numPicture, posMarker);
            })
            this.$bus.$on('startGame',() => {
                this.startGame()
            })
            this.$bus.$on('stopGame',() => {
                this.gameStarted = 2
                this.stopChrono()
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
                    this.gameStarted = 1;
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
                let score = 0;
                console.log(distance_metters)

                if(distance_metters < this.serie.distance){
                    score =  5;
                }
                if(distance_metters > this.serie.distance && distance_metters < 2 * this.serie.distance){
                    score = 3;
                }
                if(distance_metters > this.serie.distance * 2 && distance_metters < 3 * this.serie.distance){
                    score = 1;
                }

                console.log(score)
                if(this.time.secondes < 5){
                    score = score * 4;
                }
                if(this.time.secondes > 5 && this.timer.secondes < 10){
                    score = score * 2;
                }
                if(this.timer.secondes > 20){
                    score = 0;
                }

                score = this.$store.state.progressGame.score + score
                this.$store.commit("setScore",score)
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
                    this.totalSecondes = 0;
                    this.time.minutes = 0;
                    this.time.secondes = 0;

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