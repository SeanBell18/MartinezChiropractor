import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'

export default class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            indexStart: 0,
            indexEnd: 7
        }
        this.nextWeek = this.nextWeek.bind(this);
        this.previousWeek = this.previousWeek.bind(this);
    }
    componentDidMount() {
        console.log(this.props)
        axios.get('/api/isAdmin').then((val) => {
            console.log('val: ', val)
            this.props.updateLogin(val)
        })
    }
    nextWeek() {
        if (this.state.indexEnd > 89) {
            alert("Sorry, cannot plan further than this point!")
        } else {
            this.setState({
                indexStart: this.state.indexStart + 7,
                indexEnd: this.state.indexEnd + 7
            })
        }
    }
    previousWeek() {
        if (this.state.indexStart > 0) {
            this.setState({
                indexStart: this.state.indexStart - 7,
                indexEnd: this.state.indexEnd - 7
            })
        } else {
            alert("Sorry, cannot go back any further!")
        }
    }
    render() {
        let { isAdmin, isUser } = this.props
        if (isAdmin || isUser) {


            //returns 40
            const currentWeek = moment().week();
            //returns 1(week containing Jan 1 is week 1)
            // const firstWeek = moment().add('Month', 2).endOf('Month').week();
            // //returns 44
            // const endWeek = moment().endOf('Month').week();
            // // returns index of day of the week (sun-0; sat-6)
            // const startDay = moment().startOf('Month').day()


            let allDays = []
            for (let i = 0; i < 91; i++) {
                allDays.push(moment().startOf('week').week(currentWeek).add('day', i).format('ddd, MMM Do'))
            }

            let displayWeek = allDays.slice(this.state.indexStart, this.state.indexEnd)

            return (
                <div>
                    <button onClick={this.previousWeek}>Previous Week</button>
                    {displayWeek}
                    <button onClick={this.nextWeek}>Next Week</button>
                    <div >
                        Day
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