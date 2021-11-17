import Vue from 'vue'
import VueRouter from 'vue-router'
import Scores from '../pages/Scores'
import OperatingDays from '../pages/OperatingDays'
import Operations from '../pages/Operations'

Vue.use(VueRouter)

const routes = [
  {
    path: '/scores',
    name: 'Scores',
    component: Scores
  },
  {
    path: '/operatingdays',
    name: 'OperatingDays',
    component: OperatingDays
  },
  {
    path: '/operations',
    name: 'Operations',
    component: Operations
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
