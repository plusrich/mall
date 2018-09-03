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

export function setDefaultAddress(item, userId) {
    return new Promise((resolve, reject) => {
        axios.post('/setDefault', )
    })
}