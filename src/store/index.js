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
    game:null
  },
  mutations: {
    saveGame(state,game){
      state.game = game;
    }
  },
  actions: {
  },
  modules: {
  }
})