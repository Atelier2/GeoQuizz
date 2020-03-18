<template>
    <b-container class="home" fluid="true">
      <b-row class="text-center">
        <b-col class="game-container">
          <div class="title">
            <img src="../assets/logo.svg" width="64" alt="logo"><h1>GeoQuizz</h1>
          </div>
          <div class="start-game">
            <b-button variant="primary">Lancer une partie !</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped lang="scss">
  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  .home{
    height: 100vh;
    background-image: url("../assets/home/background_image.svg");
    background-size: cover;
    width: 100vw;
  }
  .game-container{
    margin-top: 50vh;
    transform: translateY(-50%);
  }
  h1{
    display: inline;
    font-size: 4em;
  }
  img{
    margin-left: 2%;
    margin-right: 2%;
    vertical-align: top;
  }
  .start-game{
    margin-top: 1em;
  }
</style>