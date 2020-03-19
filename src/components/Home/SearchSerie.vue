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