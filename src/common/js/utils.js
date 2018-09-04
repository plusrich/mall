export function generateUniqueId() {
    let uid = parseInt(Math.random()*1000).toString(16) + new Date().getTime().toString(16)
    return uid
}