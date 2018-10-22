require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const axios = require('axios')
const massive = require('massive')

const app = express();
app.use(bodyParser.json())

const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET
} = process.env

//connect to db
massive(CONNECTION_STRING).then(db => app.set('db', db))

//middleware
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))
//to ignore authentification
// let authBypass = async (req, res, next) => {
//     console.log(process.env.NODE_ENV)
//     if (process.env.NODE_ENV) {
//         const db = req.app.get('db')
//         let res = await db.session_user()
//         req.session.user = res[0]
//         console.log('req.session.user: ', res)
//         next()
//     } else {
//         next()
//     }
// }

//endpoints
app.get('/auth/callback', async (req, res) => {
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }
    // post request with code for token
    let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
    // use token to get user data
    let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)

    let { email, sub, name, phone } = userRes.data

    //check if user exists in db
    const db = app.get('db')
    let check_id = await db.check_id([sub])
    if (check_id[0]) {
        //if user is found, put returned user on session
        req.session.user = check_id[0]
    } else {
        //no user was found by this google id. create new user in db
        let newClient = await db.register_user([name, sub, email, phone])
        req.session.user = newClient[0]
    }
    res.redirect('/#/calendar')
})

app.get('/api/isAdmin', (req, res) => {
    console.log('req.session.user=', req.session.user)
    if (req.session.user) {
        res.status(200).send(req.session.user.is_admin)
    } else {
        res.status(401).send("Please log in")
    }
})

// app.get('/api/user-data', authBypass, (req, res) => {
//     if (req.session.user) {
//         res.status(200).send(req.session.user)
//     } else {
//         res.status(401).send('Please log in')
//     }
// })

// app.get('/auth/logout', (req, res) => {
//     req.session.destroy();
//     res.redirect('http://localhost:3000/#/')
// })

app.listen(SERVER_PORT, () => console.log(`I have eyes on port ${SERVER_PORT}`))