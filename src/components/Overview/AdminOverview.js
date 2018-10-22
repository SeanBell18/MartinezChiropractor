import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

export default class AdminOverview extends Component {

    render() {
        return (
            <div>
                <h1>{moment().day()}</h1>
            </div>
        )
    }
}