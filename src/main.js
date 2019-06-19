import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import Home from './Home'
import Game from './Game'
import VueRouter from 'vue-router'
import Board from './Board';
import './style.css';
import './animated.css';

Vue.config.productionTip = false
const options = {
  color: 'green',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/board', component: Board },
  { path: '/game', component: Game }
]

const router = new VueRouter({
  routes
})

new Vue({
  router
}).$mount('#app')