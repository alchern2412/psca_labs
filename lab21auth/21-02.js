// DIGEST authentification

const express = require('express')
const passport = require('passport')

const DigestStrategy = require('passport-http').DigestStrategy
const {getCredentials, verPassword} = require('./21-01util')

const app = express()
const PORT = 3000

// ---------

passport.use(new DigestStrategy({qop: 'auth'}, (username, done) => {
    let res = null
    const user = getCredentials(username)
    if (!user) {
        return done(null, false)
    }
    return done(null, user.user, user.password)
}, (params, done) => {
    // validate nonces as necessary
    console.log('params', params)
    done(null, true)
}))
// --------

app.get('/login',
    passport.authenticate('digest', {session: false}),
    (req, res) => {
        res.send('You are logged in')
    }
)
app.get('/resource',
    passport.authenticate('digest', {session: false}),
    (req, res) => {
        res.send('Resource')
    }
)
app.get('/logout', (req, res) => {
    // console.log(req.session)
    // // req.session.destroy()
    // req.logout()
    // res.redirect('/')

    req.logout();
    res.send(401);

})


app.listen(PORT, () => console.log('Server is running. Port:', 3000))













