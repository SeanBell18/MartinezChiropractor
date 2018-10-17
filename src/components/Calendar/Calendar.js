import React, { Component } from 'react'
import moment from 'moment'

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
        //Formats (Dates as of 10/16/2018)
        //23-10-2018
        const tomorrow = moment().add('week', 1).format('DD-MM-YYYY');
        //Sun, Oct 15th 2016
        const yesterday = moment().subtract({ 'year': 2, 'day': 1 }).format('ddd, MMM Do YYYY');
        //Tuesday, October 16th, 2018
        const today = moment().format('dddd, MMMM Do YYYY');
        //returns Sun Oct 14th 09:30
        const test = moment().week(42).startOf('week').add({ 'hour': 9, 'minute': 30 }).format('ddd, MMM Do HH:mm')

        //returns 40
        const startWeek = moment().startOf('Month').week();
        //returns 1(week containing Jan 1 is week 1)
        const firstWeek = moment().add('Month', 2).endOf('Month').week();
        //returns 44
        const endWeek = moment().endOf('Month').week();
        // returns index of day of the week (sun-0; sat-6)
        const startDay = moment().startOf('Month').day()


        let allDays = []
        for (let i = 0; i < 91; i++) {
            allDays.push(moment().startOf('week').week(startWeek).add('day', i).format('ddd, MMM Do'))
        }

        let displayWeek = allDays.slice(this.state.indexStart, this.state.indexEnd)


        return (
            <div>
                <button onClick={this.previousWeek}>Previous Week</button>
                {displayWeek}
                <button onClick={this.nextWeek}>Next Week</button>
            </div>
        )
    }
}