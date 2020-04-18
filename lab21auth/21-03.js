const express = require('express')
const app = express()
const fs = require('fs')
const cookieParser = require('cookie-parser')
const {verPassword} = require("./21-01util");
const {getCredentials} = require("./21-01util");

const PORT = 3000;

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.get('/login', (req, res) => {
    console.log('/login')
    const loginPage = fs.ReadStream('./21-03.html')
    loginPage.pipe(res)
})

app.post('/login', (req, res) => {
    console.log('params', req.body)
    if (req.body.login && req.body.password) {
        const credentials = req.body
        const user = getCredentials(credentials.login)
        if (user && verPassword(user.password, credentials.password)) {
            res.cookie('token', 'xxx-yyy-zzz').redirect('/resource')
        }
    }


    res.send(401)
})

app.get('/resource', (req, res) => {
    const cookies = req.cookies
    if (cookies && cookies.token) {
        if (cookies.token === 'xxx-yyy-zzz') {
            res.send('resource')
        }
    }
    res.send(401)
})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/login')
})

app.listen(PORT, () => console.log('Server is running; Port:', PORT))








