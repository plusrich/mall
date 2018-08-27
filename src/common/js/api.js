import axios from 'axios'

export function login(user, pwd) {
    const data = {
        user: user,
        pwd: pwd
    }

    return new Promise((resolve, reject) => {
        axios.post('/api/user', data).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })

}