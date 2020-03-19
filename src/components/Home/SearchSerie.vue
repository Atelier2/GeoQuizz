<template>
    <div>
        <search-bar-serie id="searchbar"></search-bar-serie>

        <div v-if="selectedSerie" class="infoSeries">
            <p>Identifiant de la série : {{ selectedSerie.id }}</p><p> Ville : {{ selectedSerie.city }}</p><p> Nombre de photos : {{ selectedSerie.nb_pictures }}</p><p> Date de dernière mise à jour : {{ selectedSerie.updated_at }}</p>
        </div>

        <b-button variant="primary" @click="startGame">Lancer une partie !</b-button>
    </div>
</template>

<script>
    import SearchBarSerie from "./SearchBarSerie";

    export default {
        name: "SearchSerie",
        components: {SearchBarSerie},
        data(){
            return{
                selectedSerie:null
            }
        },
        mounted() {
            this.$bus.$on('selectedSerieChange',(serie) => {
                this.selectedSerie = serie;
            })
        },
        methods:{
            startGame(){
                console.log(this.selectedSerie)
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