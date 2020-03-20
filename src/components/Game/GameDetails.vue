<template>
    <div class="gameDetails">
        ok
    </div>
</template>

<script>
    export default {
        name: "GameDetails",
        data(){
            return{
                serie:null
            }
        },
        beforeMount() {
            this.getSerieDetails();
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

<style scoped>
    .gameDetails{
        background-color: #17a2b8;
        height: 100%;
    }
</style>