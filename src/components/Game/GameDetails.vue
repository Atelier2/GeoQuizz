<template>
    <div class="gameDetails" v-if="this.$store.state.progressGame.pictures.length > 0">
        <p>Ville: {{ serie.city }}</p>
        <p>Progression :{{ picturesPlaced }} / {{ serie.nb_pictures }}</p>
        <p>Score : {{ score }}</p>
        <p v-if="gameStarted === 1">Temps : <span v-if="chrono.minutes > 0"> {{ chrono.minutes }} minute(s)</span> {{ chrono.secondes }}</p>
        <div v-if="picturesPlaced < serie.nb_pictures && gameStarted === 1">
            <img :src="picture"/>
        </div>
        <button @click="leaveGame" class="btn btn-danger" type="button">Quitter la game</button>
    </div>
</template>

<script>
    export default {
        name: "GameDetails",
        props: ["serie", "chrono", "gameStarted"],
        mounted() {
            if (this.$store.state.progressGame.pictures.length === 0) {
                this.getPictures();
            }
        },
        computed: {
            picturesPlaced: function () {
                return this.$store.state.progressGame.picturesPlaced
            },
            score: function () {
                return this.$store.state.progressGame.score;
            },
            picture: function () {
                return this.$store.state.progressGame.pictures[this.$store.state.progressGame.picturesPlaced].link;
            }
        },
        methods: {
            getPictures() {
                this.$axios.get('series/' + this.$store.state.game.id_series + "/pictures").then((response) => {
                    this.$store.commit("progressGameLoadPictures", response.data.pictures)
                    console.log("Chargement des photos réussie");
                }).catch((e) => {
                    console.log("Erreur lors du chargement des photos");
                    this.$root.makeToast(e.response.data.message);
                })
            },
            leaveGame() {
                this.$bvModal.msgBoxConfirm('Vous ne pourrez plus rejoindre la partie !', {
                    title: 'Êtes-vous sûrs ?',
                    size: 'md',
                    buttonSize: 'md',
                    okVariant: 'danger',
                    okTitle: 'OUI',
                    cancelTitle: 'NON',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }).then(value => {
                    if (value === true) {
                        this.$axios.put('games/' + this.$store.state.game.id, {
                            "id_status": 2
                        }, {
                            headers: {Authorization: 'Bearer ' + this.$store.state.game.token}
                        }).then((response) => {
                            console.log("Fin de la partie enregistré")
                            this.$store.commit("resetGame");
                            this.$router.push("/Home")
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .gameDetails {
        background-color: #17a2b8;
        height: 100%;
        text-align: center;

        @media (max-width: 991.98px) {
            img {
                max-width: 50%;
            }
        }
        @media (min-width: 991.98px) {
            img {
                max-width: 90%;
            }
        }

        img {
            margin-bottom: 1em;
        }
    }

</style>