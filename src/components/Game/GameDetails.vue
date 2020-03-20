<template>
    <div class="gameDetails">
        <p>Ville: {{ serie.city }}</p>
        <p>Progression :{{ this.$store.state.progressGame.picturesPlaced }} / {{ serie.nb_pictures }}</p>
        <p>Score : {{ this.$store.state.progressGame.score }}</p>
    </div>
</template>

<script>
    export default {
        name: "GameDetails",
        props:["serie"],
        beforeMount() {
            this.getPictures();
        },
        methods:{
          getPictures(){
                  this.$axios.get('series/' + this.$store.state.game.id_series + "/pictures").then((response) => {
                      this.$store.commit("progressGameLoadPictures", response.data.pictures)
                      console.log("Chargement des photos réussie");
                  }).catch((e) => {
                      console.log("Erreur lors du chargement des photos");
                      this.$root.makeToast(e.response.data.message);
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