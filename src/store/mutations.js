import * as types from './mutation-type'

export default {
    [types.SET_ID](state, id) {
        state.id = id
    },
    [types.SET_NAME](state, name) {
        state.name = name
    }
}