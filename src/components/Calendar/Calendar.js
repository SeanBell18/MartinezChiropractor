import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import './calendar.css'
import { Link } from 'react-router-dom'

export default class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            appts: []
        }
        this.nextWeek = this.nextWeek.bind(this);
        this.previousWeek = this.previousWeek.bind(this);
        this.nextDay = this.nextDay.bind(this);
        this.previousDay = this.previousDay.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.requestAppt = this.requestAppt.bind(this)
    }
    componentDidMount() {
        axios.get('/api/isAdmin').then((val) => {
            this.props.updateLogin(val)
        })

        let date = moment().format('YYYY-MM-DD')
        let dateStr = date.toString()
        axios.get(`/api/appts/:${dateStr}`).then(res => {
            this.setState({ appts: [...res.data] })
        })
    }
    nextWeek() {
        if (this.state.index > 83) {
            alert("Sorry, cannot plan further than this point!")
        } else {
            this.setState({
                index: this.state.index + 7
            })
        }
    }
    nextDay() {
        if (this.state.index > 89) {
            alert("Sorry, cannot plan further than this point!")
        } else {
            this.setState({
                index: this.state.index + 1
            })
        }
    }
    previousWeek() {
        if (this.state.index > 6) {
            this.setState({
                index: this.state.index - 7
            })
        } else {
            alert("Sorry, cannot go back any further!")
        }
    }
    previousDay() {
        if (this.state.index > 0) {
            this.setState({
                index: this.state.index - 1
            })
        } else {
            alert("Sorry, cannot go back any further!")
        }
    }
    requestAppt(time, day) {
        axios.post('/api/requestAppt', { time, day })
            .then(res => this.setState({ appt: [...res.data] }))
    }
    render() {
        let { isAdmin, isUser } = this.props
        if (isUser || isAdmin) {

            const currentDay = moment().day();

            let allDays = []
            for (let i = 0; i < 91; i++) {
                allDays.push(moment().day(currentDay).add('day', i))
            }

            let arr = this.state.appts.filter(appt => appt.appt_date == moment().add('day', this.state.index).format('YYYY-MM-DD'))

            let day = Array(39).fill(0)

            let schedule = day.map((val, i) => {
                let time = moment().startOf('day').add({ 'hour': 8, 'minute': (15 + i * 15) })
                // let exist = arr.findIndex(appt => appt.appt_time === time.format('hh:mm:ss'))
                let exist = 0
                for (let ii = 0; ii < arr.length; ii++) {
                    if (arr[ii].appt_time === time.format('HH:mm:ss')) {
                        exist += 1;
                    }
                }
                if (exist === 0) {
                    return (
                        <div className='timeslot' key={i}>
                            <div id='time'>
                                {time.format('hh:mm')}
                            </div>
                            <p>Available</p>
                            <Link to='/overview'>
                                <button onClick={() => {
                                    this.requestAppt(time.format('HH:mm:ss'), allDays[this.state.index].format('YYYY-MM-DD'))
                                }}>Request appointment
                            </button>
                            </Link>
                        </div>
                    )
                } else {
                    return (
                        <div className='timeslot' key={i}>
                            <div id='time'>
                                {time.format('hh:mm')}
                            </div>
                            <p>Not Available</p>
                        </div>
                    )
                }
            })

            return (
                <div>
                    <button onClick={this.previousWeek}>Previous Week</button>
                    <button onClick={this.previousDay}>Previous Day</button>
                    <h4>{allDays[this.state.index].format('ddd, MMM Do')}</h4>
                    {schedule}
                    <button onClick={this.nextDay}>Next Day</button>
                    <button onClick={this.nextWeek}>Next Week</button>
                    <div >
                    </div>

                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}