// const Users = [
//     {user: 'user1', password: 'user1'},
//     {user: 'user2', password: 'user2'},
//     {user: 'user3', password: 'user3'},
// ]

const Users = require('./users')

const getCredentials = username => {
    const u = Users.find(u => {
        return u.user.toUpperCase() === username.toUpperCase()
    })
    return u
}

const verPassword = (pass1, pass2) => {
    return pass1 === pass2
}

module.exports = {
    getCredentials,
    verPassword
}