<template>
    <div class="container-fluid game">
        <div class="row">
            <div class="col-lg-10 offset-lg-2 col-md-10 offset-md-2">
                <GameMap></GameMap>
            </div>
        </div>
    </div>
</template>

<script>
    import GameMap from "../components/Game/GameMap";
    export default {
        name: "Game",
        components: {GameMap}
    }
</script>

<style scoped lang="scss">
    .row{
        height: 100vh;
    }
</style>