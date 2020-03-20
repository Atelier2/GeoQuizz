<template>
    <div class="gameDetails">
        <p>Ville: {{ serie.city }}</p>
        <p>Progression :{{ this.$store.state.progressGame.picturesPlaced }} / {{ serie.nb_pictures }}</p>
        <p>Score : {{ this.$store.state.progressGame.score }}</p>
    </div>
</template>

<script>
    export default {
        name: "GameDetails",
        props:["serie"]
    }
</script>

<style scoped>
    .gameDetails{
        background-color: #17a2b8;
        height: 100%;
    }
</style>