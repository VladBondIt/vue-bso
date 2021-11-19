import Vue from 'vue'
import Vuex from 'vuex'
import scores from './scores'
import operatingDays from './operatingDays'
import operations from './operations'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    scores,
    operatingDays,
    operations,
  }
  
})
