import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners'
import StripeCheckout from 'react-stripe-checkout'

export default class UserOverview extends Component {
    constructor() {
        super()
        this.state = {
            appts: [],
            balance: 0,
            isUploading: false,
            image: '',
            url: 'http://via.placeholder.com/200x200',
            value: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        axios.get(`/api/userAppts/`).then(res => {
            console.log('results from endpoint: ', res.data)
            this.setState({
                appts: [...res.data.appts],
                url: res.data.url[0].picture
            })
        })
        axios.get('/api/userFinances').then(res => {
            let newBalance = res.data.bills - res.data.payments
            this.setState({ balance: newBalance })
        })
    }
    uploadFile = (file, signedRequest, url) => {
        var options = {
            headers: { 'Content-Type': file.type }
        }

        axios.put(signedRequest, file, options)
        .then(res => {
            axios.put('/api/uploadPicture', { url }).then(() => {
                this.setState({ isUploading: false, url: url })
            })
            .catch(err => {
                this.setState({ isUploading: false })
                alert(`ERROR: ${err.status}\n ${err.stack}`)
            })
        })
    }
    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true })
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
        axios.get('/api/sign-s3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        }).then(res => {
            const { signedRequest, url } = res.data
            this.uploadFile(file, signedRequest, url)
        }).catch(err => {
            console.log(err)
        })
    }
    makePayment = () => {

    }
    render() {
        const today = moment().format('YYYY-MM-DD')
        let futureAppts = this.state.appts.filter(appt => appt.appt_date >= today)
        let pastAppts = this.state.appts.filter(appt => appt.appt_date < today)
        return (
            <div>
                <h2>Welcome User!</h2>
                <img src={this.state.url} alt='' width='200px' />
                {this.state.url === 'http://via.placeholder.com/200x200' ?
                    <Dropzone
                        onDropAccepted={this.getSignedRequest}
                        style={{
                            position: 'relative',
                            width: 200,
                            height: 200,
                            borderWidth: 5,
                            marginTop: 2,
                            borderStyle: 'dashed',
                            borderRadius: 4,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                        accept='image/*'
                        multiple={false}>
                        {this.state.isUploading ?
                            <GridLoader />
                            : <p>Drop file or click here to add your image!</p>}
                    </Dropzone>
                    : null
                }
                {futureAppts[0] ?
                    <h5>Your next appointment is {futureAppts[0].appt_date}</h5>
                    : <div><h5>You do not have any future appointments scheduled</h5>
                        <Link to='/calendar'>
                            <button>Schedule Appointment</button>
                        </Link>
                    </div>
                }
                {pastAppts.pop() ?
                    <h5>Your last appointment was {pastAppts.pop().appt_date}</h5>
                    : <h5>You have had no previous appointments</h5>
                }
                <h5>Your current balance is: ${this.state.balance}</h5>
                <button>Make Payment</button>
            </div>
        )
    }
}