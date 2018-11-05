import React from 'react'
import {Link} from 'react-router-dom'
import './../About.css'

export default function First_Visit() {
    return (
        <div className='first_visit'>
            <h1 className='subtitle'>Staff</h1>
            <h1 className='subtitle' v>First Visit</h1>
            
            <p>During your first visit to our office you can expect an examination as well as a treatment. You can be assured that all your questions will be answered including:
            </p>
            <ol>
                <li>What’s the cause of your problem?</li>
                <li>Whether or not we can help you?</li>
                <li>How long will it take to get better?</li>
            </ol>
            <p>Our hope is that you leave feeling first, that you were well taken care of, second, that chiropractic is going to help your problem, and third, that you are in less pain then when you came in.
            </p>
            <h1 className='subtitle'>Contact</h1>
        </div>
    )
}