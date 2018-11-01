import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import {Link} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'

export default class UserOverview extends Component {
    constructor() {
        super()
        this.state = {
            appts: [],
            balance: 0
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        axios.get(`/api/userAppts/`).then(res => {
            this.setState({
                appts: [...res.data]
            })
        })
        axios.get('/api/userFinances').then(res => {
            let newBalance = res.data.bills -res.data.payments
            this.setState({balance: newBalance})
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