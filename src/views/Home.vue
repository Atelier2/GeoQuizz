<template>
    <div class="container-fluid home">
        <div class="row">
            <div class="col-lg-4 offset-lg-4 col-md-8 offset-md-2 container-game text-center">
                <div class="title">
                    <img alt="logo" src="../assets/logo_without_text.svg" width="64">
                    <h1>GeoQuizz</h1>
                </div>
                <div class="start-game">
                    <search-serie></search-serie>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import SearchSerie from "../components/Home/SearchSerie";

    export default {
        name: 'Home',
        components: {SearchSerie},
    }
</script>

<style lang="scss" scoped>
    .home {
        min-height: 100vh;
        background-image: url("../assets/home/background_image.svg");
        background-size: cover;

        .container-game {
            margin-top: 50vh;
            transform: translateY(-50%);

            h1 {
                display: inline;
                font-size: 4em;
            }

            img {
                margin-right: 1%;
                vertical-align: top;
            }

            .start-game {
                margin-top: 1em;
            }
        }
    }
</style>