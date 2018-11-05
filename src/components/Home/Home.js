import React, {Component} from 'react'
import './home.css'

export default class Home extends Component {
    
    render () {
        return (
        <div>
            <h1>Welcome to Martinez Chiropractic!</h1>
            <h5>A center for healing</h5>
            <p>We provide services in: </p> <ul id='treatments'>
                <li>Chiropractics, </li>
                <li>Manual Therapy, </li>
                <li>Non-Surgical Decompression, </li>
                <li>Massage Therapy and </li>
                <li> Therapeutic Modalities </li>
            </ul> 
            <p id='invite'>We are located in Martinez, California and have been treating patients for over 30 years. We can't wait to see in what ways we can help you!</p> 
        </div>
        )
    }
}