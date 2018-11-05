import React from 'react'
import {Link} from 'react-router-dom'
import './About.css'

export default function About() {
    return (
        <div>
            <Link to='/about/staff'><h1 className='subtitle'>Staff</h1></Link>
            <Link to ='/about/first_visit'><h1 className='subtitle'v>First Visit</h1></Link>
            <Link to='/about/contact'><h1 className='subtitle'>Contact</h1></Link>
        </div>
    )
}