<template>
    <div class="game" v-if="serie">
                <GameDetails class="gameDetails" :serie="serie"></GameDetails>
                <GameMap :nb_pictures="serie.nb_pictures"></GameMap>
    </div>
</template>

<script>
    import GameMap from "../components/Game/GameMap";
    import GameDetails from "../components/Game/GameDetails";
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