<template>
    <div>
    <div v-show="step === 1">
        <search-bar-serie id="searchbar"></search-bar-serie>

        <div v-if="selectedSerie" class="infoSeries">
            <p>Identifiant de la série : {{ selectedSerie.id }}</p><p> Ville : {{ selectedSerie.city }}</p><p> Nombre de photos : {{ selectedSerie.nb_pictures }}</p><p> Date de dernière mise à jour : {{ selectedSerie.updated_at }}</p>
        </div>

        <b-button variant="primary" @click="step++" :disabled="!selectedSerie">Choisir cette série !</b-button>
    </div>
        <div v-show="step === 2">
            <div>
                <b-form-input type="text" v-model="username" placeholder="Votre pseudo"></b-form-input>
            </div>
            <b-button variant="primary" @click="startGame" :disabled="!username">Démarrer la partie !</b-button>
        </div>
    </div>
</template>

<script>
    import SearchBarSerie from "./SearchBarSerie";

    export default {
        name: "SearchSerie",
        components: {SearchBarSerie},
        data(){
            return{
                selectedSerie:null,
                username:'',
                step:1
            }
        },
        mounted() {
            this.$bus.$on('selectedSerieChange',(serie) => {
                this.selectedSerie = serie;
            })
        },
        methods:{
            startGame(){
                this.$axios.post('games', {
                    "username":this.username,
                    "id_series":this.selectedSerie.id
                }).then((response) => {
                    console.log("Création de la partie réussie");
                    this.$store.commit("saveGame",response.data.game)
                }).catch((e) => {
                    console.log("Erreur lors de la création de la partie: "+e.response.data.message)
                    this.$root.makeToast(e.response.data.message)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .infoSeries{
        p{
            color: #007bff;
            font-size: 1em;
            font-weight: bold;
            margin: 0.2em;
        }
    }
    .btn{
        margin-top: 1em;
    }
</style>