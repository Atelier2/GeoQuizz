<template>
    <div class="gameDetails" v-if="this.$store.state.progressGame.pictures.length > 0">
        <p>Ville: {{ serie.city }}</p>
        <p>Progression :{{ picturesPlaced }} / {{ serie.nb_pictures }}</p>
        <p>Score : {{ score }}</p>
        <div v-if="picturesPlaced < serie.nb_pictures">
            <img :src="picture"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GameDetails",
        props:["serie"],
        mounted() {
            if(this.$store.state.progressGame.pictures.length === 0){
                this.getPictures();
            }
        },
        computed:{
          picturesPlaced:function(){
              return this.$store.state.progressGame.picturesPlaced
          },
            score:function(){
              return this.$store.state.progressGame.score;
            },
            picture:function(){
              return this.$store.state.progressGame.pictures[this.$store.state.progressGame.picturesPlaced].link;
            }
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

<style scoped lang="scss">
    .gameDetails{
        background-color: #17a2b8;
        height: 100%;
        text-align: center;

        img{
            max-width: 90%;
        }
    }
</style>