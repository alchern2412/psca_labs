const express = require('express')
const passport = require('passport')

const BasicStrategy = require('passport-http').BasicStrategy
const {getCredentials, verPassword} = require('./21-01util')

const session = require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: '12345678'
})

const app = express()
const PORT = 3000

// ---------

passport.use(new BasicStrategy((user, password, done) => {
    console.log('Passport.use', user, password)
    let res = null
    let cr = getCredentials(user)

    if (!cr) {
        res = done(null, false, {message: 'Incorrect username'})
    } else if (!verPassword(cr.password, password)) {
        res = done(null, false, {message: 'Incorrect password'})
    } else {
        res = done(null, user)
    }

    return res
}))

passport.serializeUser((user, done) => {
    console.log('serialize', user)
    done(null, user)
})

passport.deserializeUser((user, done) => {
    console.log('deserialize', user)
    done(null, user)
})

// --------

app.use(session)
app.use(passport.initialize())
app.use(passport.session())

app.get('*', (req, res, next) => {
        console.log('preAuth')

        if (req.session.logout && req.headers['authorization']) {
            req.session.logout = false
            delete req.headers['authorization']
        }
        next()
    },
    passport.authenticate('basic'),
    (req, res, next) => {
        next()
    }
).get('/resource', (req, res, next) => {
    res.send('resource')
}).get('/logout', (req, res) => {
    req.session.logout = true
    res.redirect('/')
})

app.listen(PORT, () => console.log('Server is running. Port:', 3000))








