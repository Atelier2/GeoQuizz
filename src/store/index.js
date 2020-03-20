import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins:[vuexLocal.plugin],
  state: {
    game:null,
    progressGame:{"picturesPlaced": 0,"score":0, "pictures": []}
  },
  mutations: {
    saveGame(state,game){
      state.game = game;
    },
    resetGame(state){
      state.game = null
      state.progressGame = {"picturesPlaced": 0,"score":0, "pictures": []}
    },
    progressGameLoadPictures(state,pictures){
      state.progressGame.pictures = pictures
    },
    progressGamePlacePicture(state){
      state.progressGame.picturesPlaced++;
    }
  },
  actions: {
  },
  modules: {
  }
})