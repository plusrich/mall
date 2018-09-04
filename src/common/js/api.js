import axios from 'axios'

export function login(user, pwd) {
    const data = {
        user: user,
        pwd: pwd
    }

    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/user', data).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function getGoods() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/goods').then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function sortByPrice(sortFlag) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/goods/sort', {
            params: {
                sort: sortFlag
            }
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function filterByPrice(min, max) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/goods/filter', {
            params: {
                min: min,
                max: max
            }
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function getAddress(id) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/address/get', {
            params: {
                id: id
            }
        }).then((res) => {
            resolve(res.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function addOneAddress(address, id) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/address/add', {
            address: address,
            id: id
        }).then((res) => {
            resolve(res.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function deleteOneAddress(addressId, userId) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/address/delete', {
            addressId: addressId,
            userId: userId
        }).then((res) => {
            resolve(res.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function setDefaultAddress(addressId, userId) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/address/setDefault', {
            addressId: addressId,
            userId: userId
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function addOneOrder(order, userId) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/order/add', {
            order: order,
            userId: userId
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}