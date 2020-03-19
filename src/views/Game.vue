<template>
    <div class="game">
                <GameDetails class="gameDetails"></GameDetails>
                <GameMap></GameMap>
    </div>
</template>

<script>
    import GameMap from "../components/Game/GameMap";
    import GameDetails from "../components/Game/GameDetails";
    export default {
        name: "Game",
        components: {GameDetails, GameMap}
    }
</script>

<style scoped lang="scss">
    @media (max-width: 991.98px) {
        .game{
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
    }
    @media (min-width: 991.98px) {
        .game{
            display: flex;
            flex-direction: row;
            height: 100vh;
        }
    }
    .gameDetails{
        flex-basis: 15%;
    }
</style>