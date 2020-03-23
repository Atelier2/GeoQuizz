<template>
    <div>
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
        <div>
            <b-btn v-if="prevPage" :to="prevPage" @click="getLeaderboard($route.query.page,$route.query.size)">Précédent</b-btn>
            <b-btn v-if="nextPage" :to="nextPage" @click="getLeaderboard($route.query.page,$route.query.size)">Suivant</b-btn>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Leaderboard",
        data(){
            return{
                page: this.$route.query.page,
                size: this.$route.query.size,
                games: [],
                links: []
            }
        },
        created() {
            if(this.$route.query.page === undefined || this.$route.query.size === undefined){
                this.$router.push({ path: 'leaderboard', query: { page: '1', size: "10" } })
            }
            else{
                this.getLeaderboard(this.page,this.size)
            }
        },
        computed:{
          nextPage(){
              if(this.links.first !== undefined){
                  if(this.$route.path+"?page="+this.$route.query.page+"&size="+this.$route.query.size === "/"+this.links.last.href){
                      return null;
                  }else{
                      return this.links.next.href;
                  }
              }

          },
            prevPage(){
                if(this.links.first !== undefined){
                    if(this.$route.path+"?page="+this.$route.query.page+"&size="+this.$route.query.size === "/"+this.links.first.href){
                        return null;
                    }else{
                        return this.links.prev.href;
                    }
                }

            }
        },
        methods:{
            getLeaderboard(page = 1, size = 10){
                this.$axios.get('/games/leaderboard?page='+page+'&size='+size).then((response) => {
                    this.games = response.data.games
                    this.links = response.data.links
                }).catch((e) => {
                    console.log("Chargement du leaderboard échoué");
                    this.$root.makeToast(e.response.data.message);
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .btn{
        background-color: #17a2b8;
        margin: 1em;
    }
</style>