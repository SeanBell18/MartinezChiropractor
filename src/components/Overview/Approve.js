import React, { Component } from 'react'

export default class Approve extends Component {
    constructor() {
        this.state= {
            toggle: true
        }
    }
    handleClick() {
        this.setState({
            toggle: !this.state.toggle
        })

    }
    render() {
        if(this.state.togggle) {
            return (
                <button onClick={this.handleClick}>Approve</button>
            )
        } else {
            return null
        }
    }
}