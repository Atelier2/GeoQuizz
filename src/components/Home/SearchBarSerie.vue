<template>
    <v-select :options="series" label="city" placeholder="Choisissez une série" @input="selectedSerieChange" />
</template>

<script>
    import vSelect from 'vue-select'
    export default {
        name: "SearchBarSerie",
        components:{
            vSelect
        },
        data(){
            return{
                selectedSerie:null,
                series:[]
            }
        },
        beforeDestroy() {
            this.$bus.$off();
        },
        mounted() {
            this.$axios.get('series', ).then((response) => {
                this.series = response.data.series
                console.log("Chargement des séries réussie");
            }).catch((e) => {
                console.log("Erreur lors du chargement des series")
            })
        },
        methods:{
            selectedSerieChange(serie){
                this.$bus.$emit('selectedSerieChange', serie);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~vue-select/dist/vue-select.css";

    .v-select{
        background-color: white;
    }
</style>