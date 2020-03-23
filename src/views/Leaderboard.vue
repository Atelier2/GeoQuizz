<template>
    <b-container class="leaderboard" fluid="true">
        <div class="row">
            <div class="col-lg-4 offset-lg-4 col-md-8 offset-md-2  container-leaderboard text-center">
                <div class="title">
                    <h2>Classement</h2>
                    <ArrayLeaderboard></ArrayLeaderboard>
                </div>
            </div>
        </div>
    </b-container>
</template>

<script>
    import ArrayLeaderboard from "../components/Leaderboard/ArrayLeaderboard";
    export default {
        name: "Leaderboard",
        components:{
            ArrayLeaderboard
        }
    }
</script>

<style scoped lang="scss">
    .leaderboard {
        min-height: 100vh;
        background-image: url("../assets/home/background_image.svg");
        background-size: cover;

    .container-leaderboard {
        margin-top: 25vh;
        transform: translateY(-25%);

    h2 {
        font-weight: bold;
        margin-bottom: 1em;
    }

    }
    }
</style>