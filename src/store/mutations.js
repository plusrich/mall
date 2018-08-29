import * as types from './mutation-type'

export default {
    [types.SET_ID](state, id) {
        state.id = id
    },
    [types.SET_NAME](state, name) {
        state.name = name
    },
    [types.SET_CARTLIST](state, item) {
        let list = state.cartList.slice()

        let index = list.findIndex((p) => {
            return p._id === item._id
        })

        if (index < 0) {
            list.unshift(item)
        }

        if (index >= 0) {
            list.splice(index, 1, item)
        }
        
        state.cartList = list
    },
    [types.SET_ORDER](state, obj) {
        state.order = obj
    },
}