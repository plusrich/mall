import Vue from 'vue'
import vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'
import createLogger from 'vuex/dist/logger'
import { Store } from '../../node_modules/vuex';

Vue.use(vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: debug ? [createLogger()] : []
})