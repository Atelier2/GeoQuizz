import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Leaderboard from "../views/Leaderboard";
import Game from "../views/Game";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    alias: '/',
    component: Home
  },
  {
    path: '/leaderboard',
    name: "Leaderboard",
    component: Leaderboard
  },
  {
    path: '/game',
    name: "Game",
    component: Game
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
