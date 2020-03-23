<template>
    <table class="table table-bordered table-hover table-dark">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Pseudo</th>
            <th scope="col">Score</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(game,index) in games">
            <th scope="row">{{ index+1 }}</th>
            <td>{{ game.pseudo}}</td>
            <td>{{ game.score}}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "Leaderboard",
        data(){
            return{
                page: this.$route.query.page,
                size: this.$route.query.size,
                games: []
            }
        },
        mounted() {
            this.getLeaderboard(this.page,this.size)
        },
        methods:{
            getLeaderboard(page = 1, size = 10){
                this.$axios.get('/games/leaderboard?page='+page+'&size='+size).then((response) => {
                    this.games = response.data.games
                }).catch((e) => {
                    console.log("Chargement du leaderboard échoué");
                    this.$root.makeToast(e.response.data.message);
                })
            }
        }
    }
</script>

<style scoped>

</style>