<template>
    <div class="endPage">
        <div class="end-container">
            <p>Partie terminée !</p>
            <b-form-checkbox v-model="share">Cocher cette case pour partager votre score</b-form-checkbox>
            <button @click="endGame" class="btn btn-danger">Retour à l'accueil</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "endPage",
        data(){
            return{
                share:false
            }
        },
        methods:{
            endGame(){
                if(this.share === true){
                        this.$axios.put('games/'+ this.$store.state.game.id,{
                            "score": this.$store.state.progressGame.score
                        },{
                            headers: {Authorization: 'Bearer ' + this.$store.state.game.token}
                        }).then((response) => {
                            console.log("Score partager")
                        })
                }
                this.$store.commit("resetGame");
                this.$router.push("/Home")
            }
        }
    }
</script>

<style scoped>
    .endPage{
        width: 100%;
    }
    .end-container{
        text-align: center;
        margin-top: 50vh;
        transform: translateY(-50%);
    }
</style>