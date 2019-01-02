import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import company from './modules/company'
import getters from './getters'
import tagsView from './modules/tagsView'
import errorLog from './modules/errorLog'
import partner from './modules/partner'
import maintenance from './modules/maintenance'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    errorLog,
    company,
    partner,
    maintenance
  },
  getters
})

export default store
