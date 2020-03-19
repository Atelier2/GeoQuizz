<template>
    <div>
        <search-bar-serie id="searchbar" :selectedSerie="selectedSerie"></search-bar-serie>
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
            this.$axios.get('series', { headers: {'Access-Control-Allow-Origin': '*'} } ).then((response) => {
                console.log("Chargement des séries réussie");
                console.log(response.data)
            }).catch((e) => {
                console.log("Erreur lors du chargement des series")
            })
            this.$bus.$on('selectedSerieChange',(value) => {
                this.selectedSerie = value;
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
    .btn{
        margin-top: 1em;
    }
</style>