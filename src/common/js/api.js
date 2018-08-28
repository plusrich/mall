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