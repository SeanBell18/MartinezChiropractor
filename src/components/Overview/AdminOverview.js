import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

export default class AdminOverview extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            apptToday: 0,
            allAppts: [],
            pending: [],
            clients: []
        }
    }
    componentDidMount = async () => {
        await axios.get('/api/clients').then(res => this.setState({ clients: [...res.data] }))
        this.apptProcess()
    }
    apptProcess = async () => {
        await axios.get('/api/allAppts').then(res => this.setState({ allAppts: [...res.data], pending: [], apptToday: 0 }))
        console.log('mapping over allappts: ', this.state.allAppts)
        this.state.allAppts.map((appt) => {
            if (appt.appt_date === moment().format('YYYY-MM-DD')) {
                this.setState({ apptToday: this.state.apptToday + 1 })
            }
            if (appt.approved === 'pending') {
                let oldArr = [...this.state.pending]
                oldArr.push(appt)
                this.setState({ pending: oldArr })
            }
            return null
        })
    }
    handleApprove = async (id) => {
        await axios.put(`/api/approve/${id}`).then(res => {
            this.apptProcess()
        })

    }
    handleDelete = async (id) => {
        await axios.delete(`/api/deleteAppt/${id}`).then(res => {
            this.apptProcess()
        })
    }
    // userName = (e) => {this.setState({user: e.target.value})}
    // userSearch = (name) => {
    //     axios.get(`/api/getUserInfo`).then(res => {

    //     })
    // }
    render() {
        console.log('state after mount: ', this.state)
        return (
            <div>
                <h1>Overview</h1>
                <p>Number of appointments today: {this.state.apptToday}</p>
                <p>Appointments awaiting approval: </p>
                {this.state.pending.map(appt => {
                    return (
                        <div key={appt.appt_id}>
                            <p>Appoinement Date: {appt.appt_date}</p>
                            <p>Appointment Time: {appt.appt_time}</p>
                            <button onClick={() => this.handleApprove(appt.appt_id)}>Approve</button>
                            <button onClick={() => this.handleDelete(appt.appt_id)}>Delete</button>
                        </div>
                    )
                })}
                {/* <p>Search for Client information (input customer name): </p><input onChange={this.userName}/><button onClick={() => this.userSearch}>Search</button> */}
            </div>
        )
    }
}