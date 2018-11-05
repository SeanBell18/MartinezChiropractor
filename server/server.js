require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const axios = require('axios')
const massive = require('massive')
const moment = require('moment')
const aws = require('aws-sdk')

const app = express();
app.use(bodyParser.json())


const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET,
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env

//connect to db
massive(CONNECTION_STRING).then(db => app.set('db', db), console.log("DB is watching"))

//middleware
app.use( express.static( `${__dirname}/../build` ) ); 

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
        redirect_uri: `${process.env.AUTH_PROTOCAL}://${req.headers.host}/auth/callback`
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

app.get('/api/allAppts', async (req, res) => {
    const db =app.get('db')
    let appts =  await db.get_appts('2017-01-01')
    res.status(200).send(appts)
})

app.get('/api/clients', async (req, res) => {
    const db = app.get('db')
    let clients = await db.get_clients()
    res.status(200).send(clients)
})

app.put('/api/approve/:id', async (req, res) => {
    const db = app.get('db')
    let {id} = req.params
    await db.approve(id)
    res.sendStatus(200)
})

app.delete('/api/deleteAppt/:id', (req, res) => {
    const db = app.get('db')
    let {id} = req.params
    db.delete_appt(id).then(() => {
        res.sendStatus(200)
    })
})

app.get('/api/appts/:date', async (req, res) => {
    let date = req.params.date
    const db = app.get('db')
    let arr = await db.get_appts(date)
    res.status(200).send(arr)
})

app.post('/api/requestAppt', (req, res) => {
    const db = app.get('db')
    let { day, time } = req.body
    let { client_id } = req.session.user
    let today = moment().format('YYYY-MM-DD')

    db.create_invoice([client_id, today]).then(invoice => {
        db.request_appt([client_id, invoice[0].invoice_id, day, time])
            .then(() =>
                db.get_appts([today])
                    .then(allAppts => {
                        res.status(200).send(allAppts)
                    })
            )
    })
})

app.get('/api/userAppts', (req, res) => {
    const db =app.get('db')
    let {client_id} = req.session.user
    db.user_picture([client_id]).then(url => {
        db.user_appts([client_id]).then((appts) => {
            let info = {url: url, appts: appts}
            res.status(200).send(info)
        })
    })
})

app.get('/api/userFinances', (req, res) => {
    const db = app.get('db')
    let{client_id} = req.session.user
    db.user_payment([client_id]).then((paymentTotal)=> {
        let pTotal = paymentTotal[0].total_payment
        db.user_invoice([client_id]).then((invoiceInfo) => {
            let charge_total = invoiceInfo.reduce((acc, input) => {
                return acc + (input.price * input.qty)
            },0)
            let result = {payments: pTotal, bills: charge_total}
            res.status(200).send(result)
        })
    }).catch(err => console.log('issues: ', err))
})

app.get('/api/sign-s3', (req, res) => {
    aws.config = {
        region: 'us-west-1',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
    const s3 = new aws.S3()
    const fileName = req.query['file-name']
    const fileType = req.query['file-type']
    const s3Params ={
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType, 
        ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            console.log(err)
            return res.end()
        }
        const returnData = {
            signedRequest: data, 
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        }
        return res.send(returnData)
    })
})

app.put('/api/uploadPicture', async (req, res) => {
    const db = app.get('db')
    let {url} = req.body
    await db.upload_picture([url, req.session.user.client_id])
    res.sendStatus(200)
})

// app.get('/api/user-data', authBypass, (req, res) => {
//     if (req.session.user) {
//         res.status(200).send(req.session.user)
//     } else {
//         res.status(401).send('Please log in')
//     }
// })

app.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect(`${process.env.LOCAL}`)
})

app.post('/api/payment', (req, res) => {
    const db =app.get('db')
    const {amount, token:{id}} = req.body
    stripe.charges.create(
        {
            amount: amount,
            currency: "usd",
            source: id,
            description: "Payment made to Martinez Chiropractic"
        },
        async (err, charge) => {
            if(err) {
                console.log(err)
                return res.status(500).send(err)
            } else {
                console.log(charge)
                await db.create_payment(req.session.user.client_id, (amount/100), moment().format('YYYY-MM-DD'))
                return res.status(200).send(charge)
            }
        }
    )
})

app.listen(SERVER_PORT, () => console.log(`I have eyes on port ${SERVER_PORT}`))