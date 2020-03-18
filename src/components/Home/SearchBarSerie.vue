<template>
    <v-select :options="series" />
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
                series:["test","test1","test2"]
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~vue-select/dist/vue-select.css";

    .v-select{
        background-color: #eceae6;
    }
</style>